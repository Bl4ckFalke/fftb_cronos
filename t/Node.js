// JavaScript source code
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Token-Details
const CONTRACT_ADDRESS = "0xd677944Df705924AF369d2FCcf4A989f343DbCDf";
const API_KEY = "YOUR_CRONOSCAN_API_KEY";
const DECIMALS = 18; // Falls dein Token andere Dezimalstellen hat, anpassen

// API-Endpunkt für den Circulating Supply
app.get("/supply", async (req, res) => {
    try {
        const response = await axios.get(`https://api.cronoscan.com/api`, {
            params: {
                module: "stats",
                action: "tokensupply",
                contractaddress: CONTRACT_ADDRESS,
                apikey: API_KEY
            }
        });

        // Supply in der richtigen Einheit berechnen
        const rawSupply = response.data.result;
        const circulatingSupply = rawSupply / Math.pow(10, DECIMALS);

        // JSON-Antwort für CoinGecko
        res.json({ circulating_supply: circulatingSupply });
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
    }
});

// Server starten
app.listen(PORT, () => console.log(`API läuft auf Port ${PORT}`));
