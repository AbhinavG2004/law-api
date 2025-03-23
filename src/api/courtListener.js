const axios = require("axios");

const COURTLISTENER_SEARCH_API = "https://www.courtlistener.com/api/rest/v4/search/";

async function getLegalCase(query) {
    try {
        const response = await axios.get(COURTLISTENER_SEARCH_API, {
            params: { q: query, format: "json" },
        });

        if (response.data.results.length > 0) {
            const caseData = response.data.results[0]; // Get first case
            return `📌 *${caseData.caseName}*\n🏛 *Court:* ${caseData.court}\n📅 *Date Filed:* ${caseData.dateFiled}\n🔗 *More:* ${caseData.absolute_url}`;
        } else {
            return "❌ No legal cases found for this query.";
        }
    } catch (error) {
        console.error("Error fetching cases:", error);
        return "⚠️ Error retrieving legal cases.";
    }
}

module.exports = { getLegalCase };
