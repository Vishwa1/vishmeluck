// api/getQuotes.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const symbols = req.query.symbols;
  if (!symbols) {
    res.status(400).json({ error: "No symbols provided" });
    return;
  }

  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract only what we need
    const result = data.quoteResponse.result.map(x => ({
      symbol: x.symbol.replace('.NS',''),
      price: x.regularMarketPrice,
      change: x.regularMarketChangePercent
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
