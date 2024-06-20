const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/chat", async (req, res) => {
  const userInput = req.body.input;

  if (!userInput) {
    return res.status(400).json({ error: "Input is missing or empty" });
  }

  try {
    const response = await axios.post("http://localhost:5000/generate", {
      prompt: userInput,
      max_length: 100,
    });

    res.json({ response: response.data });
  } catch (error) {
    console.error("Error communicating with GPT-Neo:", error);
    res.status(500).send("Error communicating with GPT-Neo");
  }
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
