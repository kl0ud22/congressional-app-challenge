//tr4CKD front end: take a photo, send it to the server, show a color result
//note: to add a language, copy one block below and translate the words.


const LANGUAGES = 
{
  //set English words and labels
  en: 
  {
    name: "English",
    speech: "en-US",
    takePhoto: "Take a photo of your food",
    checking: "Checking your food…",
    readAloud: "Read out loud",
    tryAnother: "Check another food",
    disclaimer: "This is only an estimate, not medical advice. Always follow your doctor and dietitian.",
    error: "Sorry, something went wrong. Please try again.",
    labels: { green: "Good choice", yellow: "Small amount only", orange: "Be careful", red: "Avoid", unknown: "Not sure" },
  },

  //set Spanish words and labels
  es: 
  {
    name: "Español",
    speech: "es-ES",
    takePhoto: "Tome una foto de su comida",
    checking: "Revisando su comida…",
    readAloud: "Leer en voz alta",
    tryAnother: "Revisar otra comida",
    disclaimer: "Esto es solo una estimación, no un consejo médico. Siga siempre a su médico y dietista.",
    error: "Lo siento, algo salió mal. Inténtelo de nuevo.",
    labels: { green: "Buena opción", yellow: "Solo un poco", orange: "Cuidado", red: "Evitar", unknown: "No estoy seguro" },
  },

  //set Cantonese words and labels
  yue: 
  {
    name: "廣東話",
    aiName: "Cantonese (written colloquial Cantonese in Traditional Chinese characters, as used in Hong Kong)",
    speech: "zh-HK",
    takePhoto: "幫食物影張相",
    checking: "檢查緊食物…",
    readAloud: "讀出嚟",
    tryAnother: "檢查其他食物",
    disclaimer: "呢個只係估計，唔係醫療建議。請跟醫生同營養師嘅指示。",
    error: "唔好意思，出咗問題。請再試一次。",
    labels: { green: "可以食", yellow: "食少少", orange: "小心", red: "唔好食", unknown: "唔肯定" },
  },

  //set Mandarin words and labels
  zh: 
  {
    name: "中文 (普通话)",
    speech: "zh-CN",
    takePhoto: "给食物拍照",
    checking: "正在检查食物…",
    readAloud: "朗读",
    tryAnother: "检查其他食物",
    disclaimer: "这只是估计，不是医疗建议。请遵从医生和营养师的指导。",
    error: "出错了，请再试一次。",
    labels: { green: "可以吃", yellow: "少吃一点", orange: "小心", red: "不要吃", unknown: "不确定" },
  },

};



//colors and their corresponding symbols
const ICONS = 
{ 
  green: "✓", 
  yellow: "–", 
  orange: "!", 
  red: "✕", 
  unknown: "?" 
};

const $ = (id) => document.getElementById(id);
const screens = ["start-screen", "loading-screen", "result-screen"];
let lastResult = null;



//uses local storage to remember what language you chose last, otherwise defaults to english
function getLanguage() 
{
  try 
  {
    return LANGUAGES[localStorage.getItem("language")] ? localStorage.getItem("language") : "en";
  } 
  

  catch 
  {
    return "en";
  }
}



//change all the text marked as 'data-text' to the chosen language
function setLanguage(code) 
{
  try 
  { 
    localStorage.setItem("language", code); 
  } 

  catch {}
  
  document.documentElement.lang = code;
  const words = LANGUAGES[code];
  document.querySelectorAll("[data-text]").forEach((el) => 
  {
    el.textContent = words[el.dataset.text];
  });
  
  if (lastResult) showResult(lastResult);

}



//shows only one screen at a time
function showScreen(id) 
{
  screens.forEach((s) => 
    { 
      $(s).hidden = s !== id; 
    });
}



//shrink big phone photos so they upload quickly.
async function resizePhoto(file, maxSize = 1024) 
{
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");

  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
}



//fills in the color result, adds best guess notes if needed, and adds the link to source
function showResult(result) 
{
  const words = LANGUAGES[getLanguage()];
  const rating = ICONS[result.rating] ? result.rating : "unknown";

  $("result-card").className = `result ${rating}`;
  $("result-icon").textContent = ICONS[rating];
  $("result-label").textContent = words.labels[rating];
  $("result-food").textContent = result.food_name;
  $("result-reason").textContent = result.reason;
  $("result-tip").textContent = result.tip;

  const source = $("result-source");
  source.replaceChildren();
  
  
  if (result.recognized === false) 
  {
    const note = document.createElement("span");
    note.textContent = "Not on our list. This is a best guess.";
    source.append(note, document.createElement("br"));
  }


  if (result.source?.startsWith("https://"))  //verifies that the source is a secure link
  {
    const link = document.createElement("a");
    link.href = result.source;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Where this comes from";
    source.append(link);
  }
  
  showScreen("result-screen");

}



//reads the analysis and little description out loud
function speakResult() 
{
  if (!lastResult || !("speechSynthesis" in window)) return;

  const words = LANGUAGES[getLanguage()];
  const text = [words.labels[lastResult.rating] ?? "", lastResult.food_name, lastResult.reason, lastResult.tip].join(". ");
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = words.speech;
  utterance.rate = 0.85; //reads text a bit slower so its easier to follow

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}



async function checkPhoto(file) 
{
  showScreen("loading-screen");

  try 
  {
    const imageBase64 = await resizePhoto(file); //shrinks photo to speed up upload
    const response = await fetch("/api/check", //send photo to api to analyze
    {
      method: "POST",
      headers: 
      { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ imageBase64, mediaType: "image/jpeg", language: LANGUAGES[getLanguage()].aiName ?? LANGUAGES[getLanguage()].name }),
    });


    if (!response.ok) throw new Error(`Server error ${response.status}`);
    
    lastResult = await response.json();
    showResult(lastResult);
  } 


  catch (err) 
  {
    console.error(err);
    alert(LANGUAGES[getLanguage()].error);
    showScreen("start-screen");

  }
}



//hook up buttons
const select = $("language");
for (const [code, { name }] of Object.entries(LANGUAGES)) 
{
  select.add(new Option(name, code));
}

select.value = getLanguage();
select.addEventListener("change", () => setLanguage(select.value));
setLanguage(select.value);


$("photo").addEventListener("change", (event) => 
{
  const file = event.target.files[0];
  event.target.value = "";
  if (file) checkPhoto(file);
});


$("speak").addEventListener("click", speakResult);

$("again").addEventListener("click", () => 
{
  lastResult = null;
  showScreen("start-screen");
});





