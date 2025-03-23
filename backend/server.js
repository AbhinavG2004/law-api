const express = require("express");
const cors = require("cors");
const { getLegalCase } = require("./api/courtListener");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const userQuery = req.body.message;
    const responseText = await getLegalCase(userQuery);
    res.json({ response: responseText });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
