const fetch = require('node-fetch');
const fs = require('fs');
const { exec } = require('child_process');

// Your API credentials and settings
const API_KEY = "AIzaSyBj3RdjwB1sVi65PL54bDWgbSUIBTmvEpc";
const SPREADSHEET_ID = "17VzE-oCbYz9uovYlqJDR9rjeCP1A9c4PmAZRdVj8CyM";
const RANGE = "Sheet1";
async function updateData() {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('data.json', jsonData);
    console.log('data.json updated successfully.');
    exec('git add data.json && git commit -m "Update data.json" && git push', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during git commit: ${error}`);
        return;
      }
      console.log(stdout);
    });
  } catch (error) {
    console.error("Error fetching or updating data: ", error);
  }
}
updateData();
