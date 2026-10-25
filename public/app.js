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
    
    //labels for tabs
    tabCamera: "Camera",
    tabInfo: "Info",
    infoTitle: "Kidney info",

    //INFO PAGE CONTENT:
    info: 
    {
      about: "In stage 4 kidney disease, the kidneys do not clean the blood well. Choosing the right foods helps protect them. Your doctor and dietitian tell you your own limits, because blood tests decide how much potassium and phosphorus you can have.",
      sections: [
        { 
          color: "green", title: "Good choices", items: [
          "Apples, berries and grapes",
          "Cauliflower, cabbage, peppers and onions",
          "White rice, white bread and pasta",
          "Unsalted popcorn and unsalted crackers",
          "Olive oil, herbs and spices",] 
        },

        { 
          color: "yellow", title: "Small amounts only", items: [
          "Chicken, turkey, fish and eggs",
          "Beans, lentils and tofu",
          "Low-fat milk or yogurt",
          "Red meat, about once a week at most",] 
        },

        { 
          color: "orange", title: "Be careful (eat very little)", items: [
          "Bananas, oranges and melons",
          "Potatoes, tomatoes and spinach",
          "Avocado",
          "Nuts, seeds and oatmeal",
          "Raisins and prunes",] 
        },

        { 
          color: "red", title: "Avoid", items: [
          "Bacon, ham, sausage and deli meats",
          "Fried and fast food",
          "Canned or salted foods, chips and soy sauce",
          "Salt substitutes (they contain potassium)",
          "Dark colas and foods with “phos” on the label",
          "Coconut milk",] 
        },

        { 
          color: "gray", title: "Drinks count", items: [
          "Anything liquid counts toward your fluid limit: water, coffee, milk, juice, soup, ice, gelatin and ice cream.",
          "Ask your care team how much you can drink each day.",] 
        },
      ],
      
      links: "Learn more (English websites)",
    },
  },


  //set Spanish words and labels (same structure and organization as English)
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

    tabCamera: "Cámara",
    tabInfo: "Información",
    infoTitle: "Información sobre los riñones",

    info: 
    {
      about: "En la enfermedad renal en etapa 4, los riñones no limpian bien la sangre. Elegir bien los alimentos ayuda a protegerlos. Su médico y su dietista le dicen sus propios límites, porque los análisis de sangre deciden cuánto potasio y fósforo puede tomar.",
      sections: [
        { 
          color: "green", title: "Buena opción", items: [
          "Manzanas, frutos rojos y uvas",
          "Coliflor, repollo, pimientos y cebolla",
          "Arroz blanco, pan blanco y pasta",
          "Palomitas de maíz y galletas sin sal",
          "Aceite de oliva, hierbas y especias",] 
        },

        { 
          color: "yellow", title: "Solo un poco", items: [
          "Pollo, pavo, pescado y huevos",
          "Frijoles, lentejas y tofu",
          "Leche o yogur bajos en grasa",
          "Carne roja, como máximo una vez por semana",] 
        },

        { 
          color: "orange", title: "Cuidado (muy poco)", items: [
          "Plátanos, naranjas y melones",
          "Papas, tomates y espinacas",
          "Aguacate",
          "Nueces, semillas y avena",
          "Pasas y ciruelas pasas",] 
        },

        { 
          color: "red", title: "Evitar", items: [
          "Tocino, jamón, salchichas y embutidos",
          "Comida frita y comida rápida",
          "Alimentos enlatados o salados, papas fritas de bolsa y salsa de soja",
          "Sustitutos de la sal (contienen potasio)",
          "Refrescos de cola oscuros y alimentos con “fosfato” o “phos” en la etiqueta",
          "Leche de coco",] 
        },

        { 
          color: "gray", title: "Las bebidas cuentan", items: [
          "Todo lo que es líquido cuenta para su límite de líquidos: agua, café, leche, jugo, sopa, hielo, gelatina y helado.",
          "Pregunte a su equipo médico cuánto puede beber al día.",] 
        },
      ],

      links: "Más información (sitios web en inglés)",
    },
  },


  //set Cantonese words and labels (same structure and organization as English)
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

    tabCamera: "影相",
    tabInfo: "資料",
    infoTitle: "腎臟資料",

        info: {
      about: "第4期腎病嘅腎臟洗唔乾淨血液。揀啱食物可以保護腎臟。你嘅限制要問醫生同營養師，因為驗血結果會決定你可以食幾多鉀同磷。",
      sections: [
        { color: "green", title: "可以食", items: [
          "蘋果、莓同提子",
          "椰菜花、椰菜、甜椒同洋蔥",
          "白飯、白麵包同意粉",
          "無鹽爆谷同無鹽餅乾",
          "橄欖油、香草同香料",
        ] },
        { color: "yellow", title: "食少少", items: [
          "雞、火雞、魚同蛋",
          "豆、扁豆同豆腐",
          "低脂奶或乳酪",
          "紅肉，一個星期最多一次",
        ] },
        { color: "orange", title: "小心（盡量少食）", items: [
          "香蕉、橙同蜜瓜",
          "薯仔、番茄同菠菜",
          "牛油果",
          "果仁、種子同燕麥",
          "提子乾同西梅乾",
        ] },
        { color: "red", title: "唔好食", items: [
          "煙肉、火腿、腸同凍肉",
          "炸嘢同快餐",
          "罐頭或鹹嘅食物、薯片同豉油",
          "代鹽（含鉀）",
          "深色可樂同成分有「phos」嘅食物",
          "椰漿",
        ] },
        { color: "gray", title: "飲品都要計", items: [
          "所有液體都計入你嘅飲水限額：水、咖啡、奶、果汁、湯、冰、啫喱同雪糕。",
          "請問醫護團隊你一日可以飲幾多。",
        ] },
      ],

      links: "了解更多（英文網站）",
    },
  },


  //set Mandarin words and labels (same structure and organization as English)
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

    tabCamera: "拍照",
    tabInfo: "资料",
    infoTitle: "肾脏资料",

    info: 
    {
      about: "在4期肾病, 肾脏清理血液的能力下降。选对食物有助于保护肾脏。你自己的限制请问医生和营养师, 因为验血结果决定你每天可以摄入多少钾和磷。",
      sections: [
        { 
          color: "green", title: "可以吃", items: [
          "苹果、莓类和葡萄",
          "花菜、卷心菜、甜椒和洋葱",
          "白米饭、白面包和面食",
          "无盐爆米花和无盐饼干",
          "橄榄油、香草和香料",] 
        },

        { 
          color: "yellow", title: "少吃一点", items: [
          "鸡肉、火鸡肉、鱼和鸡蛋",
          "豆类、扁豆和豆腐",
          "低脂牛奶或酸奶",
          "红肉，每周最多一次",] 
        },

        { 
          color: "orange", title: "小心（尽量少吃）", items: [
          "香蕉、橙子和甜瓜",
          "土豆、番茄和菠菜",
          "牛油果",
          "坚果、种子和燕麦",
          "葡萄干和西梅干",] 
        },

        { 
          color: "red", title: "不要吃", items: [
          "培根、火腿、香肠和熟肉制品",
          "油炸食品和快餐",
          "罐头或腌制食品、薯片和酱油",
          "代盐产品（含钾）",
          "深色可乐和配料表里有“磷”（phos）的食品",
          "椰奶",] 
        },

        { 
          color: "gray", title: "饮品也要算", items: [
          "所有液体都要计入你的饮水限额：水、咖啡、牛奶、果汁、汤、冰、果冻和冰淇淋。",
          "请问医护团队你每天可以喝多少。",] 
        },
      ],

      links: "了解更多（英文网站）",
    },


  },

};



//links to sorces at bottom of page (site names are not translated)
const SOURCES = 
[
  ["National Kidney Foundation: stage 4 CKD", "https://www.kidney.org/kidney-topics/stage-g4-chronic-kidney-disease-ckd"],
  ["National Kidney Foundation: kidney-friendly foods", "https://www.kidney.org/kidney-topics/superfoods"],
  ["American Kidney Fund: kidney-friendly eating plan", "https://www.kidneyfund.org/living-kidney-disease/healthy-eating-activity/kidney-friendly-eating-plan"],
  ["American Kidney Fund: stage 4 CKD", "https://www.kidneyfund.org/all-about-kidneys/stages-kidney-disease/stage-4-chronic-kidney-disease-ckd-causes-symptoms-and-treatment"],
  ["Kidney Fund Kitchen: stages 3 to 5, not on dialysis", "https://kitchen.kidneyfund.org/eating-healthy-with-kidney-disease/kidney-disease-stages-3-4-5-not-on-dialysis/"],
  ["NIDDK: healthy eating with CKD", "https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd/healthy-eating-adults-chronic-kidney-disease"],
  ["National Kidney Foundation of Michigan: food list and tips", "https://nkfm.org/wp-content/uploads/2024/04/Kidney-Friendly-Food-List-Tips_final.pdf"],
  ["Rogosin Institute: diet guidance", "https://wellness.rogosininstitute.org/diet/"],
];


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
const screens = ["start-screen", "loading-screen", "result-screen", "info-screen"];
let lastResult = null;

let currentTab = "camera";
let cameraScreen = "start-screen";



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



//set info screen to selected language
function renderInfo() 
{
  const info = LANGUAGES[getLanguage()].info;
  const box = $("info-content");
  box.replaceChildren();

  const about = document.createElement("p");
  about.textContent = info.about;
  box.append(about);

  for (const section of info.sections) 
  {
    const card = document.createElement("div");
    card.className = `info-card ${section.color}`;

    const heading = document.createElement("h3");
    heading.textContent = `${ICONS[section.color] ?? ""} ${section.title}`.trim();

    const list = document.createElement("ul");
    for (const item of section.items) 
    {
      const li = document.createElement("li");
      li.textContent = item;
      list.append(li);
    }

    card.append(heading, list);
    box.append(card);
  }

  const linksHeading = document.createElement("h3");
  linksHeading.textContent = info.links;
  const links = document.createElement("ul");
  links.className = "info-links";
  for (const [name, url] of SOURCES) 
  {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = name;
    li.append(a);
    links.append(li);
  }
  box.append(linksHeading, links);
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
  
  renderInfo();
  if (lastResult) showResult(lastResult);

}



//shows only one screen at a time
function showScreen(id) 
{
  //remember the camera screen even while on the Info tab, so a result that arrives late doesn't pull you away from Info page
  if (id !== "info-screen") cameraScreen = id;
  const visible = currentTab === "info" ? "info-screen" : cameraScreen;
  screens.forEach((s) => 
    { 
      $(s).hidden = s !== visible; 
    });
}

function showTab(tab) 
{
  currentTab = tab;
  document.querySelectorAll("#tab-bar button").forEach((button) => 
    {
    const active = button.dataset.tab === tab;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  showScreen(cameraScreen);
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

//making tabs switchable by clicking
document.querySelectorAll("#tab-bar button").forEach((button) => {
  button.addEventListener("click", () => showTab(button.dataset.tab));
});





