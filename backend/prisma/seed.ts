import db from "../prismaClient.ts";

type Database= any;

const stocks = [
  // 🟦 Tech
  { symbol: "AAPL", name: "Apple", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/apple_z6sxhw.svg" },
  { symbol: "MSFT", name: "Microsoft", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765393075/Microsoft_wgu1js.svg" },
  { symbol: "GOOG", name: "Alphabet (Google)", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392371/google_cl8o0b.svg" },
  { symbol: "AMZN", name: "Amazon", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392370/amazon_mxx8co.svg" },
  { symbol: "NVDA", name: "NVIDIA", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392370/nvidia_epctwg.svg" },
  { symbol: "META", name: "Meta Platforms", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392370/meta_rp0p45.svg" },
  { symbol: "TSLA", name: "Tesla", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392366/tesla_b4j8ck.svg" },
  { symbol: "ADBE", name: "Adobe", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392365/adobe_t4hgvc.svg" },
  { symbol: "NFLX", name: "Netflix", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765440987/Netflix_alhll3.svg" },
  

  // 🟩 Finance
  { symbol: "JPM", name: "JPMorgan Chase", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392365/JPMorganChase_bhh62a.svg" },
  { symbol: "BAC", name: "Bank of America", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392364/Bank_of_America_etmo8s.svg" },
  { symbol: "V", name: "Visa", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392364/visa_ul7dyz.svg" },
  { symbol: "MA", name: "Mastercard", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392363/mastercard_l6kjfy.svg" },

  // 🟧 Consumer & Retail
  { symbol: "WMT", name: "Walmart", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392362/Walmart_hfqgdl.svg" },
  { symbol: "COST", name: "Costco", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392359/Costco_d2pzgj.svg" },
  { symbol: "KO", name: "Coca-Cola", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392359/Coca-Cola_vtius9.svg" },
  { symbol: "MCD", name: "McDonald’s", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392358/McDonald_s_zkkzqv.svg" },

  // 🟥 Healthcare
  { symbol: "JNJ", name: "Johnson & Johnson", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392358/Johnson_and_Johnson_lfxgsu.svg" },
  { symbol: "PFE", name: "Pfizer", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392358/Pfizer_qgckk1.svg" },
  { symbol: "UNH", name: "UnitedHealth Group", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392357/UnitedHealth_ejfdjm.svg" },

  // 🟪 Energy
  { symbol: "XOM", name: "Exxon Mobil", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392357/Exxon_shwdlt.svg" },
  { symbol: "CVX", name: "Chevron", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392357/Chevron_cdxodu.svg" },

  // 🟨 Automotive & Industrials
  { symbol: "F", name: "Ford", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/Ford_alifpq.svg" },
  { symbol: "BA", name: "Boeing", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/boeing_jtvh8f.svg" },

  // 🟫 Entertainment & Communications
  { symbol: "DIS", name: "Disney", logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/disneyplus_cjxrfs.svg" }
];



async function insertStocks() {
  await db.Stocks.createMany({ data: stocks });
}

insertStocks();