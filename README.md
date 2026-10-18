# tr4CKD
## Congressional App Challenge 2026

Take a photo of a meal and get a simple color rating of whether it is a good choice for someone with stage 4 chronic kidney disease (CKD G4).

tr4CKD was built for an older family member with CKD who has poor vision and limited English. Instead of reading food labels or searching online, he can take a photo of his food and see a color, a symbol, and a short reason that tells him whether he should or shouldn't eat the food. It also provides a link to its source from an official food reference list and offers a read-aloud option. This app supports English, Spanish, Cantonese and Mandarin. 

**Results are estimates, not medical advice. Always follow your doctor and kidney dietitian.**


### What it does
- Photo in, color out. Green, yellow, orange or red, shown with a symbol as well as a color so it works for people who can't tell colors apart.
- Plain-language reason and tip, in English, Spanish, Cantonese (廣東話) or Mandarin (中文).
- Read-aloud button so the result can be heard, not just read.
- Grounded in kidney-diet sources. Ratings come from a reviewed reference list built from eight reliable kidney-health sources (National Kidney Foundation, American Kidney Fund, NIDDK, and others). Each result links to where its rule came from.
- Honest about unknown foods. If a food isn't on the list, the app still gives its best guess, and clearly says "Not on our list, so this is a best guess." This matters for dishes, such as many Cantonese ones, that U.S. food databases don't cover.
- Made for low vision. Very large buttons and text, high contrast, and one main action per screen.


### How it works
1. The phone takes a photo and shrinks it so it uploads quickly.
2. The server sends the photo, along with the food reference list, to Claude.
3. Claude names the food, checks it against the list, and replies with a rating, a reason, a tip and a source link.
4. The page shows the result in the chosen language.

The API key stays on the server and is never sent to the phone.



### Run it yourself
You need Node.js 20 or newer.

```sh
npm install
```
```sh
npm start
```

Then open http://localhost:3000. Without an API key, the app runs in demo mode and shows a pretend answer.


**For real answers:**
1. Create a key at https://console.anthropic.com.
2. Copy .env.example to .env.
3. Paste your key after ANTHROPIC_API_KEY= and run npm start again.

NOTE:
***Never commit your .env file. It is already listed in .gitignore.***



To try it on a phone, put the phone and computer on the same Wi-Fi and open http://<your computer's IP address>:3000.


### Project layout
Path: What it is

- server.js:	Serves the app and asks Claude to rate each photo
- public/index.html:	The screens: camera button, loading, result
- public/style.css:	Large, high-contrast styles and the four rating colors
- public/app.js:	Takes the photo, sends it, shows the result, translations, read aloud
- public/manifest.webmanifest, public/icon.svg:	Lets a phone add the app to its home screen
- data/kidney-food-reference.md:	The food rules and source links the ratings are based on


### Limits
- Ratings are a rough guide from a photo. Portion size, cooking method and hidden ingredients can't always be seen.
- The reference list is a draft and has not been reviewed by a dietitian yet. A kidney dietitian's advice always comes first.
- The sources' own advice differs in places. The reference file notes where they disagree.



### Planned next
- A tab bar with a calendar for dialysis appointments.
- A place to add a dietitian's own list or lab results so ratings fit the person.
- An information page with short summaries about CKD, do and don't eat lists, and links to reliable sources.