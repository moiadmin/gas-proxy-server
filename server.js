const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());  // Dùng CORS cho phép kết nối từ các domain khác
app.use(express.json());  // Parse JSON body request

// URL của Google Apps Script API
const GAS_URL = "https://script.google.com/macros/s/AKfycbxKCZSw_HwrD5XTIRi_SG9MS47hd7Yy5HKFS9xg-22Cj-ELhQ_8Fv97qxIEGvr5UPhU/exec";

// Định nghĩa endpoint proxy cho client gửi dữ liệu
app.post("/proxy", async (req, res) => {
    try {
        // Gửi dữ liệu POST tới Google Apps Script
        const response = await axios.post(GAS_URL, req.body, {
            headers: { "Content-Type": "application/json" },
        });

        // Trả lại kết quả từ GAS cho client
        res.json(response.data);
    } catch (error) {
        // Xử lý lỗi nếu có vấn đề xảy ra
        console.error("Error while fetching data from GAS:", error.message);
        res.status(500).json({ error: "Failed to fetch data from GAS" });
    }
});

// Lắng nghe kết nối từ client (nếu môi trường phát triển local hoặc môi trường Heroku)
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});
