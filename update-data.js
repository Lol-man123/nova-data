const fetch = require('node-fetch');
const fs = require('fs');
// Removed: const { exec } = require('child_process');

// Your API credentials and settings
const API_KEY = "AIzaSyBj3RdjwB1sVi65PL54bDWgbSUIBTmvEpc";
const SPREADSHEET_ID = "17VzE-oCbYz9uovYlqJDR9rjeCP1A9c4PmAZRdVj8CyM";
const RANGE = "Sheet1";  // Adjust if needed

async function updateData() {
  try {
    // Build the URL for the Google Sheets API
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    // Convert the data to JSON format (nicely formatted)
    const jsonData = JSON.stringify(data, null, 2);

    // Write the data to data.json in your repository
    fs.writeFileSync('data.json', jsonData);
    console.log('data.json updated successfully.');

    // Removed: automatic git commit and push commands
  } catch (error) {
    console.error("Error fetching or updating data: ", error);
  }
}
updateData();
