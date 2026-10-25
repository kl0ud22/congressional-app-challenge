# tr4CKD
## Congressional App Challenge 2026


**tr4CKD:** Take a photo of any food and get a simple color rating of whether it is a good choice for someone with stage 4 chronic kidney disease (CKD G4).

tr4CKD was built for an older family member with Stage 4 CKD who has poor vision and limited English. Instead of reading food labels or searching online, this app will allow him to easily take a photo of his food and see a color, a symbol, and a short reason that tells him whether he should or should not eat the food. It also provides a link to its source from a food reference site and offers a read-aloud option. This app supports English, Spanish, Cantonese, and Mandarin. 

**Results are estimates, not medical advice. Always follow your doctor and kidney dietitian.**

<br>

---

### What tr4CKD does
- All the user has to do is take a photo of their food, and then this app displays a color rating, a short reason, and safe alternatives. A large green, yellow, orange or red box is shown with a symbol so that those with limited vision and those who can't tell colors apart can still identify the rating.
- Has plain-language reason and meal tips offered in English, Spanish, Cantonese (廣東話), or Mandarin (中文).
- Offers a read-aloud button so the result can be heard and not just read.
- Provides ratings that come from a reviewed reference list built from eight reliable kidney-health sources (National Kidney Foundation, American Kidney Fund, NIDDK, and others). Each result links to where its rule came from.
- If a food isn't on the list, the app still gives its best guess, and clearly says "Not on our list, so this is a best guess." This matters for numerous dishes that general U.S. food databases don't cover.
- Includes an Info Tab that has short kidney-friendly eating guidance and describes the meaning of each color-coded card (good choices, small amounts, be careful, avoid). This also has a note about drinks counting toward fluid limits and ends the page with links to reliable sources.
- Has a Calendar feature that keeps track of upcoming appointments, such as dialysis or doctor visits. Appointments are saved only on the phone itself so nothing private leaves the user's device.
- Displays very large buttons, text, high contrast colors, and one main action per screen for simplicity.

<br>

---

### How it works
1. The phone takes a photo and shrinks it so it uploads quickly
2. The server sends the photo, along with the food reference list, to Claude to be analyzed
3. Claude names the food, checks it against the list, and replies with a rating, a reason, meal advice, and a source link
4. The page shows the result in the chosen language

<br>

The API key stays on the server and is never sent to the phone.

<br>

---

### Privacy
- Photos are sent to the server only to be rated. They are not saved by this app
- Appointments stay in the browser on the phone (localStorage). They are never sent to the server
- The app does not collect names, medical records, or lab results

<br>

---

### Run it yourself
You need Node.js 20 or newer.

```sh
npm install
```
```sh
npm start
```
<br>

Then open http://localhost:3000. 
Without an API key, the app runs in demo mode and shows a pretend answer.

<br>

**For real answers:**
1. Create a key at https://console.anthropic.com
2. Copy *.env.example* to *.env*
3. Paste your key after *ANTHROPIC_API_KEY=* and run npm start again

<br>

NOTE:
***Never commit your .env file. It is already listed in .gitignore.***

<br>

To try it on a phone, put the phone and computer on the same Wi-Fi and open http://<your computer's IP address>:3000.

<br>

---

### Project layout
Path: What it is

- ***server.js***:	Serves the app and asks Claude to rate each photo
- ***public/index.html***:	The screens: Camera tab (camera, loading, results), Info page, and Calendar. (all 3 pages accessible through bottom tab bar)
- ***public/style.css***:	Large, high-contrast styles and the four rating colors
- ***public/app.js***:	Takes the photo, sends it, shows the result, functions the tabs, info page, appointments, translations, and read aloud
- ***public/manifest.webmanifest, public/icon.svg***:	Lets a phone add the app to its home screen
- ***data/kidney-food-reference.md***:	The food rules and source links the ratings are based on

<br>

---

### Limits
- Ratings are a rough guide from a photo. Portion size, cooking method, and hidden ingredients can't always be seen.
- The reference list is a draft and has not been reviewed by a dietitian yet. A kidney dietitian's advice always comes first
- The sources' own advice differs in places. The reference file notes where they disagree
- The Spanish, Cantonese and Mandarin wording is a draft and should be checked by fluent speakers
- Appointments don't sync between devices, and clearing the browser's site data deletes them

<br>

---

### Planned next
- A page to add a dietitian's list or lab results so the ratings are personalized to the user. Currently, this feature is left out because it involves sensitive health information and needs careful privacy design
- Appointment reminders that go with the calendar feature
- A saved history of meals
- More language options

<br>

---

### License
MIT. See LICENSE .