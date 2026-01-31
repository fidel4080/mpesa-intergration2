const axios = require("axios");
const { stk_url } = require("../config/mpesa");

const stkPush = async (req, res) => {
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;

    const date = new Date();
    const timestamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    const shortCode = process.env.MPESA_SHORT_CODE;
    const passKey = process.env.MPESA_PASSKEY;

    const password = Buffer.from(shortCode + passKey + timestamp).toString("base64");

    const payload = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: shortCode,
        PhoneNumber: `254${phone}`,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "Fidel STK Test",
        TransactionDesc: "Test Payment"
    };

    try {
        const response = await axios.post(stk_url, payload, {
            headers: {
                Authorization: `Bearer ${req.token}`
            }
        });

        console.log("✅ STK Push Sent");
        res.status(200).json(response.data);

    } catch (error) {
        console.error("❌ STK Error:", error.message);

        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

const stkCallback = (req, res) => {
    const callbackData = req.body.Body.stkCallback;

    console.log("✅ CALLBACK RECEIVED");
    console.log(JSON.stringify(callbackData, null, 2));

    if (callbackData.ResultCode === 0) {
        console.log("✅ Payment successful");
    } else {
        console.log("❌ Payment failed / cancelled");
    }

    res.json("ok");
};

module.exports = {
    stkPush,
    stkCallback
};
