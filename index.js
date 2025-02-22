const axios = require("axios");

module.exports = async (req, res) => {
    const CONTRACT_ADDRESS = "0xd677944Df705924AF369d2FCcf4A989f343DbCDf";
    const API_KEY = STQ7U18EQSM66P5V5QRWWNKA9AGH5R6HYN;
    
    try {
        const response = await axios.get(`https://api.cronoscan.com/api`, {
            params: {
                module: "stats",
                action: "tokensupply",
                contractaddress: CONTRACT_ADDRESS,
                apikey: API_KEY
            }
        });

        const rawSupply = response.data.result;
        const circulatingSupply = rawSupply / Math.pow(10, 18); // Falls dein Token 18 Dezimalstellen hat

        res.json({ circulating_supply: circulatingSupply });
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
    }
};
