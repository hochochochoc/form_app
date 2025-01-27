const express = require("express");
const vision = require("@google-cloud/vision");
const app = express();

app.post("/analyze-image", async (req, res) => {
  // Vision API code here
});

app.listen(3000);
