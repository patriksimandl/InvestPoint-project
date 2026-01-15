import db from "../prismaClient.ts";

type Database= any;

const stocks = [
  // 🟦 Tech
  { symbol: "AAPL", name: "Apple", industry: 'Tech',logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/apple_z6sxhw.svg" },
  { symbol: "MSFT", name: "Microsoft",industry: 'Tech', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765393075/Microsoft_wgu1js.svg" },
  { symbol: "GOOG", name: "Alphabet (Google)",industry: 'Tech', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1766858093/Alphabet_Inc_Logo_2015_bco7q8.svg" },
  { symbol: "AMZN", name: "Amazon", industry: 'Tech',logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392370/amazon_mxx8co.svg" },
  { symbol: "NVDA", name: "NVIDIA",industry: 'Tech', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392370/nvidia_epctwg.svg" },
  { symbol: "META", name: "Meta Platforms",industry: 'Tech', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392370/meta_rp0p45.svg" },
  { symbol: "TSLA", name: "Tesla",industry: 'Tech', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392366/tesla_b4j8ck.svg" },
  { symbol: "ADBE", name: "Adobe",industry: 'Tech', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392365/adobe_t4hgvc.svg" },
  { symbol: "NFLX", name: "Netflix",industry: 'Tech', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765440987/Netflix_alhll3.svg" },
  

  // 🟩 Finance
  { symbol: "JPM", name: "JPMorgan Chase",industry: 'Finance', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392365/JPMorganChase_bhh62a.svg" },
  { symbol: "BAC", name: "Bank of America", industry: 'Finance',logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392364/Bank_of_America_etmo8s.svg" },
  { symbol: "V", name: "Visa",industry: 'Finance', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392364/visa_ul7dyz.svg" },
  { symbol: "MA", name: "Mastercard",industry: 'Finance', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392363/mastercard_l6kjfy.svg" },

  // 🟧 Consumer & Retail
  { symbol: "WMT", name: "Walmart",industry: 'Consumer & Retail', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392362/Walmart_hfqgdl.svg" },
  { symbol: "COST", name: "Costco",industry: 'Consumer & Retail', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392359/Costco_d2pzgj.svg" },
  { symbol: "KO", name: "Coca-Cola",industry: 'Consumer & Retail', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392359/Coca-Cola_vtius9.svg" },
  { symbol: "MCD", name: "McDonald’s",industry: 'Consumer & Retail', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392358/McDonald_s_zkkzqv.svg" },

  // 🟥 Healthcare
  { symbol: "JNJ", name: "Johnson & Johnson", industry: 'Healthcare', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392358/Johnson_and_Johnson_lfxgsu.svg" },
  { symbol: "PFE", name: "Pfizer" ,industry: 'Healthcare', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392358/Pfizer_qgckk1.svg" },
  { symbol: "UNH", name: "UnitedHealth Group",industry: 'Healthcare', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392357/UnitedHealth_ejfdjm.svg" },

  // 🟪 Energy
  { symbol: "XOM", name: "Exxon Mobil",industry: 'Energy', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392357/Exxon_shwdlt.svg" },
  { symbol: "CVX", name: "Chevron", industry: 'Energy',logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392357/Chevron_cdxodu.svg" },

  // 🟨 Automotive & Industrials
  { symbol: "F", name: "Ford", industry: 'Automotive & Industrials',logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/Ford_alifpq.svg" },
  { symbol: "BA", name: "Boeing",industry: 'Automotive & Industrials', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/boeing_jtvh8f.svg" },

  // 🟫 Entertainment & Communications
  { symbol: "DIS", name: "Disney",industry: 'Entertainment & Communications', logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/disneyplus_cjxrfs.svg" }
];



async function insertStocks() {
  await db.Stocks.createMany({ data: stocks });
}

insertStocks();