import db from "../prismaClient.ts";


const stocks = [
  // 🟦 Tech
  { symbol: "AAPL", name: "Apple" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "GOOG", name: "Alphabet (Google)" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "META", name: "Meta Platforms" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "ADBE", name: "Adobe" },
  { symbol: "NFLX", name: "Netflix" },

  // 🟩 Finance
  { symbol: "JPM", name: "JPMorgan Chase" },
  { symbol: "BAC", name: "Bank of America" },
  { symbol: "V", name: "Visa" },
  { symbol: "MA", name: "Mastercard" },

  // 🟧 Consumer & Retail
  { symbol: "WMT", name: "Walmart" },
  { symbol: "COST", name: "Costco" },
  { symbol: "KO", name: "Coca-Cola" },
  { symbol: "MCD", name: "McDonald’s" },

  // 🟥 Healthcare
  { symbol: "JNJ", name: "Johnson & Johnson" },
  { symbol: "PFE", name: "Pfizer" },
  { symbol: "UNH", name: "UnitedHealth Group" },

  // 🟪 Energy
  { symbol: "XOM", name: "Exxon Mobil" },
  { symbol: "CVX", name: "Chevron" },

  // 🟨 Automotive & Industrials
  { symbol: "F", name: "Ford" },
  { symbol: "BA", name: "Boeing" },

  // 🟫 Entertainment & Communications
  { symbol: "DIS", name: "Disney" }
];



async function insertStocks (){
  await db.Stocks.createMany({data : stocks});
}

insertStocks();