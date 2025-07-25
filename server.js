const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

const GAS_URL = "https://script.google.com/macros/s/AKfycbxKCZSw_HwrD5XTIRi_SG9MS47hd7Yy5HKFS9xg-22Cj-ELhQ_8Fv97qxIEGvr5UPhU/exec";

app.use(express.json());

app.post("/dopost", async (req, res) => {
    try {
        const response = await axios.post(GAS_URL, req.body, {
            headers: { "Content-Type": "application/json" },
            maxRedirects: 5,
        });
        res.status(200).json(response.data);
    } catch (err) {
        console.error("Lỗi proxy:", err.message);
        res.status(500).json({ error: "Lỗi proxy hoặc GAS không phản hồi." });
    }
});

app.get("/", (req, res) => {
    res.send("Proxy Server hoạt động!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
