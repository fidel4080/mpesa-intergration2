const axios = require("axios");
const { oauth_url } = require("../config/mpesa.js");

const generateToken = async (req, res, next) => {
    try {
        const consumerKey = process.env.MPESA_CONSUMER_KEY;
        const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

        const response = await axios.get(oauth_url, {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });

        console.log("✅ Token Generated Successfully");
        req.token = response.data.access_token;
        next();

    } catch (error) {
        console.error("❌ Token Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = generateToken;
