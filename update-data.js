const fetch = require('node-fetch');
const fs = require('fs');
const API_KEY = "AIzaSyBj3RdjwB1sVi65PL54bDWgbSUIBTmvEpc";
const SPREADSHEET_ID = "17VzE-oCbYz9uovYlqJDR9rjeCP1A9c4PmAZRdVj8CyM";
const SHEET_NAMES = [
  "NormalSecrets",
  "ShinySecrets",
  "MythicSecrets",
  "ShinyMythicSecrets",
  "Robux",
  "ShinyRobux",
  "MythicRobux",
  "ShinyMythicRobux",
  "Legendary",
  "ShinyLegendary",
  "MythicLegendary",
  "ShinyMythicLegendary",
  "Owners",
  "Wiki",
  "Change Log"
];
async function updateData() {
  try {
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?key=${API_KEY}`;
    SHEET_NAMES.forEach(sheet => {
      url += `&ranges=${encodeURIComponent(sheet)}`;
    });
    console.log("Fetching URL: " + url);
    const res = await fetch(url);
    const data = await res.json();
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('data.json', jsonData);
    console.log('data.json updated successfully.');
  } catch (error) {
    console.error("Error fetching or updating data: ", error);
  }
}
updateData();
