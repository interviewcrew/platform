const fs = require("fs");
const path = require("path");

// Asynchronously read input from 'input.txt'
fs.readFile(
  path.join(__dirname, "interview-transcriptions.txt"),
  "utf8",
  (err, data) => {
    if (err) {
      console.error("Error reading the input file:", err);
      return;
    }

    const result = convertToJSON(data);

    // Asynchronously write output to 'output.json'
    fs.writeFile(
      path.join(__dirname, "interview-transcription-1.json"),
      result,
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing the output file:", err);
          return;
        }
        console.log("Successfully written to output.json");
      }
    );
  }
);

function convertToJSON(inputText) {
  const lines = inputText.split("\n");
  const dialogues = [];
  let speaker = "First";

  lines.forEach((line) => {
    let timeMatch2 = line.match(/\[(\d{2}):(\d{2}):(\d{2})\.\d{3}/);
    let timeMatch1;
    if (!timeMatch2) timeMatch1 = line.match(/\[(\d{2}):(\d{2})\.\d{3}/);
    const transcription = line.split("]").pop().trim();

    if (timeMatch1 || timeMatch2) {
      let createdAt;

      if (timeMatch1) {
        createdAt = `00:${timeMatch1[1]}:${timeMatch1[2]}`;
      } else if (timeMatch2) {
        createdAt = `${timeMatch2[1]}:${timeMatch2[2]}:${timeMatch2[3]}`;
      }
      
      dialogues.push({
        createdAt,
        transcription,
        speaker,
      });
      speaker = speaker === "First" ? "Second" : "First";
    }
  });

  return JSON.stringify(dialogues, null, 2);
}
