// tr4CKD server: serves the web app and asks Claude to look at meal photos.
// Run with `npm start`, then open http://localhost:3000 on your phone or computer.

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";

try {
  process.loadEnvFile(); // reads .env if it exists
} catch {
  // no .env file, that's fine
}

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(import.meta.dirname, "public");
const MAX_BODY_BYTES = 8 * 1024 * 1024;
const DEMO_MODE = !process.env.ANTHROPIC_API_KEY;
const client = DEMO_MODE ? null : new Anthropic();

// The food rules come from a reference file, so every rating can be traced to a source.
const REFERENCE = await fs.readFile(path.join(import.meta.dirname, "data", "kidney-food-reference.md"), "utf8");

const SYSTEM_PROMPT = `You help an older adult with stage 4 chronic kidney disease (CKD G4, not on a special diet plan you know of) decide whether a meal in a photo is a good choice for their kidneys.

Look at the photo and name the food. Then check it ONLY against the reference list below. Do not use other knowledge about the food.

- If the food is in the reference list, use the rating given there (green, yellow, orange, red). Set "recognized" to true and "source" to the https URL that matches the bracketed source name on the matching rule, using the "Sources" section at the end of the list. Copy the URL exactly.
- If the food is NOT in the list, set "recognized" to false and "source" to an empty string. Still give your best guess: break the food into likely ingredients (many Cantonese dishes, such as congee, noodles, dim sum, and braised or stir-fried dishes, contain soy sauce, oyster sauce, salted fish, preserved vegetables, or rice noodles). Judge it by the same rules: sodium, potassium, phosphorus, protein and fluid. Start "reason" with "Not on our list, so this is a best guess." Then say the likely reason in plain words.
- Use "unknown" only if the photo does not show food.
- Write "reason" and "tip" in the requested language, in very short, plain words a grandparent would understand (one sentence each, no jargon, no numbers).
- If the photo does not show food, use rating "unknown".
- You are giving a rough estimate, not medical advice. His dietitian's advice always comes first.

<reference>
${REFERENCE}
</reference>`;

const RESULT_SCHEMA = {
  type: "object",
  properties: {
    rating: { type: "string", enum: ["green", "yellow", "orange", "red", "unknown"] },
    food_name: { type: "string" },
    reason: { type: "string" },
    tip: { type: "string" },
    recognized: { type: "boolean" },
    source: { type: "string" },
    concerns: {
      type: "array",
      items: { type: "string", enum: ["potassium", "phosphorus", "sodium", "protein", "fluid"] },
    },
  },
  required: ["rating", "food_name", "reason", "tip", "recognized", "source", "concerns"],
  additionalProperties: false,
};

async function checkMeal({ imageBase64, mediaType, language }) {
  if (DEMO_MODE) {
    return {
      rating: "yellow",
      food_name: "Demo meal",
      reason: "Demo mode: add an API key to get a real answer.",
      tip: "This is a pretend result so you can try the app.",
      recognized: true,
      source: "https://www.kidney.org/kidney-topics/stage-g4-chronic-kidney-disease-ckd",
      concerns: ["sodium"],
      demo: true,
    };
  }

  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 2000,
    output_config: { effort: "low", format: { type: "json_schema", schema: RESULT_SCHEMA } },
    // If the main model declines, let the API retry on a suitable fallback model.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
          { type: "text", text: `Rate this meal. Answer in this language: ${language}.` },
        ],
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("The model declined to answer this photo.");
  }
  const text = response.content.find((block) => block.type === "text")?.text;
  return JSON.parse(text);
}

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

async function serveStatic(req, res) {
  const urlPath = new URL(req.url, "http://localhost").pathname;
  const filePath = path.join(PUBLIC_DIR, urlPath === "/" ? "index.html" : urlPath);
  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": CONTENT_TYPES[path.extname(filePath)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404).end("Not found");
  }
}

async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error("Photo is too big.");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/check") {
    try {
      const body = await readJson(req);
      const result = await checkMeal(body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Something went wrong. Please try again." }));
    }
    return;
  }
  if (req.method === "GET") {
    await serveStatic(req, res);
    return;
  }
  res.writeHead(405).end();
});

server.listen(PORT, () => {
  console.log(`tr4CKD running at http://localhost:${PORT}${DEMO_MODE ? " (demo mode, no API key)" : ""}`);
});
