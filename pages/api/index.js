const axios = require("axios");

export default async function handler(req, res) {
    // 🔹 Token-Konfiguration
    const CONTRACT_ADDRESS = "0xd677944Df705924AF369d2FCcf4A989f343DbCDf";
    const DECIMALS = 18; // Falls dein Token andere Dezimalstellen hat, hier ändern
    const API_KEY = "STQ7U18EQSM66P5V5QRWWNKA9AGH5R6HYN"; // Falls kein API-Key vorhanden, leer lassen ""

    try {
        // 🔹 Cronoscan API-URL
        const apiUrl = https://api.cronoscan.com/api?module=stats&action=tokensupply&contractaddress=${CONTRACT_ADDRESS}&apikey=${API_KEY};

        // 🔹 Abrufen des Supplies
        const response = await axios.get(apiUrl);

        // 🔹 Prüfen, ob die Antwort von Cronoscan gültig ist
        if (response.data.status !== "1" || !response.data.result) {
            return res.status(500).json({ error: "Fehler beim Abrufen des Token-Supply" });
        }

        // 🔹 Token-Supply in eine lesbare Zahl umrechnen
        const rawSupply = parseFloat(response.data.result);
        const circulatingSupply = rawSupply / Math.pow(10, DECIMALS);

        // 🔹 API-Response für CoinGecko
        res.status(200).json({ circulating_supply: circulatingSupply });

    } catch (error) {
        console.error("❌ Fehler beim Abrufen des Supplies:", error.message);
        res.status(500).json({ error: "Server-Fehler beim Abrufen des Supplies" });
    }
}
