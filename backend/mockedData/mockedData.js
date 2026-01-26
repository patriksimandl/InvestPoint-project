import { mock } from "node:test"

const mockedData = [
  {
    symbol: "AAPL",
    name: "Apple",
    industry: "Tech",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/apple_z6sxhw.svg",
    companyProfile: {
      ipo: "1980-12-12",
      logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png",
      name: "Apple Inc",
      phone: "14089961010",
      ticker: "AAPL",
      weburl: "https://www.apple.com/",
      country: "US",
      currency: "USD",
      exchange: "NASDAQ NMS - GLOBAL MARKET",
      finnhubIndustry: "Technology",
      estimateCurrency: "USD",
      shareOutstanding: 15430,
      marketCapitalization: 2800000000000
    },
    data: {
      meta: {
        date_from: "2026-01-02",
        date_to: "2026-01-20",
        max_period_days: 5
      },
      data: [
        { date: "2026-01-20T00:00:00.000Z", open: 252.68, high: 254.76, low: 243.45, close: 246.73, volume: 2199898 },
        { date: "2026-01-16T00:00:00.000Z", open: 257.97, high: 258.89, low: 254.93, close: 255.51, volume: 1226337 },
        { date: "2026-01-15T00:00:00.000Z", open: 260.63, high: 261.02, low: 257.06, close: 258.19, volume: 1259525 },
        { date: "2026-01-14T00:00:00.000Z", open: 259.54, high: 261.81, low: 256.73, close: 260.1, volume: 1597987 },
        { date: "2026-01-13T00:00:00.000Z", open: 258.67, high: 261.8, low: 258.51, close: 261, volume: 1277610 }
      ]
    }
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    industry: "Tech",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765393075/Microsoft_wgu1js.svg",
    companyProfile: {
      ipo: "1986-03-13",
      logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/MSFT.png",
      name: "Microsoft Corp",
      phone: "14258828080",
      ticker: "MSFT",
      weburl: "https://www.microsoft.com/",
      country: "US",
      currency: "USD",
      exchange: "NASDAQ NMS - GLOBAL MARKET",
      finnhubIndustry: "Technology",
      estimateCurrency: "USD",
      shareOutstanding: 7460,
      marketCapitalization: 3100000000000
    },
    data: {
      meta: {
        date_from: "2026-01-02",
        date_to: "2026-01-20",
        max_period_days: 5
      },
      data: [
        { date: "2026-01-20T00:00:00.000Z", open: 451.22, high: 456.78, low: 449.3, close: 454.61, volume: 666462 },
        { date: "2026-01-16T00:00:00.000Z", open: 457.74, high: 463.18, low: 456.53, close: 459.76, volume: 521552 },
        { date: "2026-01-15T00:00:00.000Z", open: 464.07, high: 464.07, low: 455.92, close: 456.71, volume: 686964 },
        { date: "2026-01-14T00:00:00.000Z", open: 466.46, high: 468.09, low: 457.21, close: 459.55, volume: 970357 },
        { date: "2026-01-13T00:00:00.000Z", open: 474.68, high: 475.75, low: 465.98, close: 470.59, volume: 667712 }
      ]
    }
  },
  {
    symbol: "GOOG",
    name: "Alphabet (Google)",
    industry: "Tech",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1766858093/Alphabet_Inc_Logo_2015_bco7q8.svg",
    companyProfile: {
      ipo: "2004-08-19",
      logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/GOOG.png",
      name: "Alphabet Inc",
      phone: "16502530000",
      ticker: "GOOG",
      weburl: "https://www.abc.xyz/",
      country: "US",
      currency: "USD",
      exchange: "NASDAQ NMS - GLOBAL MARKET",
      finnhubIndustry: "Technology",
      estimateCurrency: "USD",
      shareOutstanding: 6000,
      marketCapitalization: 1900000000000
    },
    data: {
      meta: {
        date_from: "2026-01-02",
        date_to: "2026-01-20",
        max_period_days: 5
      },
      data: [
        { date: "2026-01-20T00:00:00.000Z", open: 321.15, high: 328.06, low: 320.95, close: 322.18, volume: 563131 },
        { date: "2026-01-16T00:00:00.000Z", open: 334.9, high: 335.1, low: 328.22, close: 330.44, volume: 182427 },
        { date: "2026-01-15T00:00:00.000Z", open: 338.06, high: 338.08, low: 331.32, close: 332.98, volume: 191767 },
        { date: "2026-01-14T00:00:00.000Z", open: 335.24, high: 337, low: 331.18, close: 336.39, volume: 206022 },
        { date: "2026-01-13T00:00:00.000Z", open: 335.27, high: 341.17, low: 334.46, close: 336.48, volume: 348802 }
      ]
    }
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    industry: "Tech",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392370/amazon_mxx8co.svg",
    companyProfile: {
      ipo: "1997-05-15",
      logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AMZN.png",
      name: "Amazon.com Inc",
      phone: "12062661000",
      ticker: "AMZN",
      weburl: "https://www.amazon.com/",
      country: "US",
      currency: "USD",
      exchange: "NASDAQ NMS - GLOBAL MARKET",
      finnhubIndustry: "Retail",
      estimateCurrency: "USD",
      shareOutstanding: 10690.22,
      marketCapitalization: 2556672015585.74
    },
    data: {
      meta: {
        date_from: "2026-01-02",
        date_to: "2026-01-20",
        max_period_days: 5
      },
      data: [
        { date: "2026-01-20T00:00:00.000Z", open: 233.56, high: 235.09, low: 229.36, close: 231.03, volume: 1804618 },
        { date: "2026-01-16T00:00:00.000Z", open: 238.9, high: 239.56, low: 236.44, close: 239.1, volume: 1082948 },
        { date: "2026-01-15T00:00:00.000Z", open: 239.3, high: 240.66, low: 236.65, close: 238.2, volume: 1480737 },
        { date: "2026-01-14T00:00:00.000Z", open: 241.03, high: 241.06, low: 236.23, close: 236.74, volume: 1855774 },
        { date: "2026-01-13T00:00:00.000Z", open: 246.74, high: 247.65, low: 240.27, close: 242.56, volume: 1363186 }
      ]
    }
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    industry: "Tech",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392370/nvidia_epctwg.svg",
    companyProfile: {
      ipo: "1999-01-22",
      logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/NVDA.png",
      name: "NVIDIA Corp",
      phone: "14084862000",
      ticker: "NVDA",
      weburl: "https://www.nvidia.com/",
      country: "US",
      currency: "USD",
      exchange: "NASDAQ NMS - GLOBAL MARKET",
      finnhubIndustry: "Semiconductors",
      estimateCurrency: "USD",
      shareOutstanding: 2460,
      marketCapitalization: 1800000000000
    },
    data: {
      meta: {
        date_from: "2026-01-02",
        date_to: "2026-01-20",
        max_period_days: 5
      },
      data: [
        { date: "2026-01-20T00:00:00.000Z", open: 181.89, high: 182.32, low: 177.65, close: 178.15, volume: 5026583 },
        { date: "2026-01-16T00:00:00.000Z", open: 189.03, high: 190.43, low: 186.09, close: 186.12, volume: 2779238 },
        { date: "2026-01-15T00:00:00.000Z", open: 186.48, high: 189.7, low: 186.34, close: 187.07, volume: 4336390 },
        { date: "2026-01-14T00:00:00.000Z", open: 184.33, high: 184.46, low: 180.86, close: 183.16, volume: 4310260 },
        { date: "2026-01-13T00:00:00.000Z", open: 184.92, high: 188.11, low: 183.41, close: 185.77, volume: 3413507 }
      ]
    }
  },{
    symbol: "META",
    name: "Meta Platforms",
    industry: "Tech",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392370/meta_rp0p45.svg",
    companyProfile: {
        ipo: "2012-05-18",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/META.png",
        name: "Meta Platforms Inc",
        phone: "16508662100",
        ticker: "META",
        weburl: "https://about.facebook.com/",
        country: "US",
        currency: "USD",
        exchange: "NASDAQ NMS - GLOBAL MARKET",
        finnhubIndustry: "Technology",
        estimateCurrency: "USD",
        shareOutstanding: 2400,
        marketCapitalization: 850000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 267.15, high: 271.32, low: 265.12, close: 269.45, volume: 1487623 },
            { date: "2026-01-16T00:00:00.000Z", open: 272.09, high: 273.50, low: 268.33, close: 270.12, volume: 1283451 },
            { date: "2026-01-15T00:00:00.000Z", open: 271.75, high: 274.18, low: 269.44, close: 272.99, volume: 1345672 },
            { date: "2026-01-14T00:00:00.000Z", open: 268.66, high: 271.99, low: 266.87, close: 270.56, volume: 1532789 },
            { date: "2026-01-13T00:00:00.000Z", open: 265.44, high: 268.77, low: 264.21, close: 267.33, volume: 1469823 }
        ]
    }
},
{
    symbol: "TSLA",
    name: "Tesla",
    industry: "Tech",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392366/tesla_b4j8ck.svg",
    companyProfile: {
        ipo: "2010-06-29",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TSLA.png",
        name: "Tesla Inc",
        phone: "16502537500",
        ticker: "TSLA",
        weburl: "https://www.tesla.com/",
        country: "US",
        currency: "USD",
        exchange: "NASDAQ NMS - GLOBAL MARKET",
        finnhubIndustry: "Automobiles",
        estimateCurrency: "USD",
        shareOutstanding: 3200,
        marketCapitalization: 870000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 312.21, high: 319.44, low: 310.12, close: 317.55, volume: 1876234 },
            { date: "2026-01-16T00:00:00.000Z", open: 309.77, high: 315.22, low: 308.65, close: 312.88, volume: 1748923 },
            { date: "2026-01-15T00:00:00.000Z", open: 314.56, high: 318.77, low: 311.44, close: 313.92, volume: 1823765 },
            { date: "2026-01-14T00:00:00.000Z", open: 310.88, high: 314.22, low: 308.33, close: 311.76, volume: 1928471 },
            { date: "2026-01-13T00:00:00.000Z", open: 307.45, high: 311.88, low: 305.12, close: 309.12, volume: 1753842 }
        ]
    }
},
{
    symbol: "ADBE",
    name: "Adobe",
    industry: "Tech",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392365/adobe_t4hgvc.svg",
    companyProfile: {
        ipo: "1986-08-20",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/ADBE.png",
        name: "Adobe Inc",
        phone: "14086505000",
        ticker: "ADBE",
        weburl: "https://www.adobe.com/",
        country: "US",
        currency: "USD",
        exchange: "NASDAQ NMS - GLOBAL MARKET",
        finnhubIndustry: "Software—Application",
        estimateCurrency: "USD",
        shareOutstanding: 515,
        marketCapitalization: 300000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 684.12, high: 690.23, low: 682.11, close: 687.54, volume: 732198 },
            { date: "2026-01-16T00:00:00.000Z", open: 679.11, high: 685.55, low: 678.33, close: 684.22, volume: 612384 },
            { date: "2026-01-15T00:00:00.000Z", open: 672.44, high: 678.77, low: 670.12, close: 675.88, volume: 645221 },
            { date: "2026-01-14T00:00:00.000Z", open: 670.33, high: 675.99, low: 668.44, close: 674.55, volume: 732911 },
            { date: "2026-01-13T00:00:00.000Z", open: 666.22, high: 671.44, low: 664.11, close: 670.88, volume: 689112 }
        ]
    }
},
{
    symbol: "NFLX",
    name: "Netflix",
    industry: "Tech",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765440987/Netflix_alhll3.svg",
    companyProfile: {
        ipo: "2002-05-23",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/NFLX.png",
        name: "Netflix Inc",
        phone: "16508664500",
        ticker: "NFLX",
        weburl: "https://www.netflix.com/",
        country: "US",
        currency: "USD",
        exchange: "NASDAQ NMS - GLOBAL MARKET",
        finnhubIndustry: "Entertainment",
        estimateCurrency: "USD",
        shareOutstanding: 450,
        marketCapitalization: 220000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 455.33, high: 462.12, low: 453.22, close: 459.88, volume: 864112 },
            { date: "2026-01-16T00:00:00.000Z", open: 462.55, high: 465.44, low: 458.77, close: 461.23, volume: 732991 },
            { date: "2026-01-15T00:00:00.000Z", open: 459.11, high: 463.88, low: 457.12, close: 460.55, volume: 711223 },
            { date: "2026-01-14T00:00:00.000Z", open: 455.88, high: 459.99, low: 453.33, close: 457.12, volume: 645887 },
            { date: "2026-01-13T00:00:00.000Z", open: 452.22, high: 456.77, low: 450.12, close: 454.88, volume: 712221 }
        ]
    }
},{
    symbol: "JPM",
    name: "JPMorgan Chase",
    industry: "Finance",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392365/JPMorganChase_bhh62a.svg",
    companyProfile: {
        ipo: "1969-01-01",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JPM.png",
        name: "JPMorgan Chase & Co.",
        phone: "12125550000",
        ticker: "JPM",
        weburl: "https://www.jpmorganchase.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Banking",
        estimateCurrency: "USD",
        shareOutstanding: 3100,
        marketCapitalization: 450000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 158.33, high: 160.12, low: 156.77, close: 159.45, volume: 982345 },
            { date: "2026-01-16T00:00:00.000Z", open: 156.88, high: 159.99, low: 155.44, close: 158.12, volume: 874321 },
            { date: "2026-01-15T00:00:00.000Z", open: 157.12, high: 160.33, low: 156.22, close: 159.88, volume: 902112 },
            { date: "2026-01-14T00:00:00.000Z", open: 155.44, high: 158.77, low: 154.33, close: 156.99, volume: 823445 },
            { date: "2026-01-13T00:00:00.000Z", open: 154.22, high: 157.88, low: 153.12, close: 155.44, volume: 812334 }
        ]
    }
},
{
    symbol: "BAC",
    name: "Bank of America",
    industry: "Finance",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392364/Bank_of_America_etmo8s.svg",
    companyProfile: {
        ipo: "1970-01-01",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/BAC.png",
        name: "Bank of America Corp",
        phone: "18003259999",
        ticker: "BAC",
        weburl: "https://www.bankofamerica.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Banking",
        estimateCurrency: "USD",
        shareOutstanding: 8500,
        marketCapitalization: 360000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 32.45, high: 33.22, low: 31.88, close: 32.88, volume: 1209876 },
            { date: "2026-01-16T00:00:00.000Z", open: 32.12, high: 33.44, low: 31.55, close: 32.44, volume: 1102345 },
            { date: "2026-01-15T00:00:00.000Z", open: 31.88, high: 32.99, low: 31.22, close: 32.12, volume: 1156789 },
            { date: "2026-01-14T00:00:00.000Z", open: 31.55, high: 32.44, low: 30.88, close: 31.88, volume: 1083345 },
            { date: "2026-01-13T00:00:00.000Z", open: 31.22, high: 32.12, low: 30.77, close: 31.55, volume: 1032234 }
        ]
    }
},
{
    symbol: "V",
    name: "Visa",
    industry: "Finance",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392364/visa_ul7dyz.svg",
    companyProfile: {
        ipo: "2008-03-19",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/V.png",
        name: "Visa Inc",
        phone: "14085498000",
        ticker: "V",
        weburl: "https://www.visa.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Credit Services",
        estimateCurrency: "USD",
        shareOutstanding: 2300,
        marketCapitalization: 510000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 250.44, high: 254.22, low: 248.77, close: 252.88, volume: 732112 },
            { date: "2026-01-16T00:00:00.000Z", open: 248.33, high: 252.44, low: 247.22, close: 250.12, volume: 682334 },
            { date: "2026-01-15T00:00:00.000Z", open: 249.12, high: 253.12, low: 247.88, close: 251.44, volume: 712223 },
            { date: "2026-01-14T00:00:00.000Z", open: 247.88, high: 251.55, low: 246.44, close: 249.88, volume: 689112 },
            { date: "2026-01-13T00:00:00.000Z", open: 246.55, high: 250.33, low: 245.22, close: 247.44, volume: 665443 }
        ]
    }
},
{
    symbol: "MA",
    name: "Mastercard",
    industry: "Finance",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392363/mastercard_l6kjfy.svg",
    companyProfile: {
        ipo: "2006-05-25",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/MA.png",
        name: "Mastercard Inc",
        phone: "14087773333",
        ticker: "MA",
        weburl: "https://www.mastercard.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Credit Services",
        estimateCurrency: "USD",
        shareOutstanding: 1800,
        marketCapitalization: 400000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 368.22, high: 372.44, low: 366.12, close: 370.88, volume: 612334 },
            { date: "2026-01-16T00:00:00.000Z", open: 365.88, high: 370.22, low: 364.33, close: 368.55, volume: 598112 },
            { date: "2026-01-15T00:00:00.000Z", open: 367.12, high: 371.33, low: 365.22, close: 369.44, volume: 605223 },
            { date: "2026-01-14T00:00:00.000Z", open: 364.55, high: 368.88, low: 363.22, close: 366.88, volume: 588332 },
            { date: "2026-01-13T00:00:00.000Z", open: 362.33, high: 366.22, low: 360.88, close: 364.44, volume: 572221 }
        ]
    }
}
,
{
    symbol: "WMT",
    name: "Walmart",
    industry: "Consumer & Retail",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392362/Walmart_hfqgdl.svg",
    companyProfile: {
        ipo: "1970-08-25",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/WMT.png",
        name: "Walmart Inc",
        phone: "18002796268",
        ticker: "WMT",
        weburl: "https://www.walmart.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Retail",
        estimateCurrency: "USD",
        shareOutstanding: 2800,
        marketCapitalization: 430000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 150.22, high: 152.33, low: 149.44, close: 151.88, volume: 1123345 },
            { date: "2026-01-16T00:00:00.000Z", open: 148.88, high: 151.44, low: 148.22, close: 150.33, volume: 1082234 },
            { date: "2026-01-15T00:00:00.000Z", open: 149.33, high: 152.22, low: 148.77, close: 150.88, volume: 1109876 },
            { date: "2026-01-14T00:00:00.000Z", open: 147.55, high: 150.33, low: 146.88, close: 149.22, volume: 1054432 },
            { date: "2026-01-13T00:00:00.000Z", open: 146.22, high: 149.22, low: 145.77, close: 147.88, volume: 1023345 }
        ]
    }
},
{
    symbol: "COST",
    name: "Costco",
    industry: "Consumer & Retail",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392359/Costco_d2pzgj.svg",
    companyProfile: {
        ipo: "1985-12-05",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/COST.png",
        name: "Costco Wholesale Corporation",
        phone: "18008327826",
        ticker: "COST",
        weburl: "https://www.costco.com/",
        country: "US",
        currency: "USD",
        exchange: "NASDAQ NMS - GLOBAL MARKET",
        finnhubIndustry: "Retail",
        estimateCurrency: "USD",
        shareOutstanding: 600,
        marketCapitalization: 300000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 550.44, high: 555.22, low: 548.77, close: 553.88, volume: 433211 },
            { date: "2026-01-16T00:00:00.000Z", open: 548.33, high: 552.44, low: 546.22, close: 550.12, volume: 412345 },
            { date: "2026-01-15T00:00:00.000Z", open: 551.12, high: 556.33, low: 549.88, close: 554.44, volume: 423334 },
            { date: "2026-01-14T00:00:00.000Z", open: 546.55, high: 552.88, low: 545.22, close: 549.88, volume: 398112 },
            { date: "2026-01-13T00:00:00.000Z", open: 544.33, high: 550.22, low: 543.88, close: 546.44, volume: 387221 }
        ]
    }
},
{
    symbol: "KO",
    name: "Coca-Cola",
    industry: "Consumer & Retail",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392359/Coca-Cola_vtius9.svg",
    companyProfile: {
        ipo: "1919-09-05",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/KO.png",
        name: "The Coca-Cola Company",
        phone: "14074073000",
        ticker: "KO",
        weburl: "https://www.coca-colacompany.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Beverages",
        estimateCurrency: "USD",
        shareOutstanding: 4300,
        marketCapitalization: 280000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 65.22, high: 66.44, low: 64.77, close: 65.88, volume: 334112 },
            { date: "2026-01-16T00:00:00.000Z", open: 64.88, high: 66.22, low: 64.22, close: 65.44, volume: 312334 },
            { date: "2026-01-15T00:00:00.000Z", open: 65.12, high: 66.88, low: 64.88, close: 66.22, volume: 323112 },
            { date: "2026-01-14T00:00:00.000Z", open: 64.22, high: 65.88, low: 63.77, close: 65.12, volume: 301223 },
            { date: "2026-01-13T00:00:00.000Z", open: 63.88, high: 65.22, low: 63.33, close: 64.44, volume: 298112 }
        ]
    }
},
{
    symbol: "MCD",
    name: "McDonald’s",
    industry: "Consumer & Retail",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392358/McDonald_s_zkkzqv.svg",
    companyProfile: {
        ipo: "1965-04-21",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/MCD.png",
        name: "McDonald's Corporation",
        phone: "18007262337",
        ticker: "MCD",
        weburl: "https://www.mcdonalds.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Restaurants",
        estimateCurrency: "USD",
        shareOutstanding: 750,
        marketCapitalization: 220000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 288.22, high: 292.44, low: 286.12, close: 290.88, volume: 412334 },
            { date: "2026-01-16T00:00:00.000Z", open: 285.88, high: 290.22, low: 284.33, close: 288.55, volume: 398112 },
            { date: "2026-01-15T00:00:00.000Z", open: 287.12, high: 291.33, low: 285.22, close: 289.44, volume: 405223 },
            { date: "2026-01-14T00:00:00.000Z", open: 284.55, high: 288.88, low: 283.22, close: 286.88, volume: 388332 },
            { date: "2026-01-13T00:00:00.000Z", open: 282.33, high: 286.22, low: 280.88, close: 284.44, volume: 372221 }
        ]
    }
},
{
    symbol: "JNJ",
    name: "Johnson & Johnson",
    industry: "Healthcare",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392358/Johnson_and_Johnson_lfxgsu.svg",
    companyProfile: {
        ipo: "1944-09-24",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JNJ.png",
        name: "Johnson & Johnson",
        phone: "18005332211",
        ticker: "JNJ",
        weburl: "https://www.jnj.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Healthcare",
        estimateCurrency: "USD",
        shareOutstanding: 2600,
        marketCapitalization: 460000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 180.22, high: 182.33, low: 179.44, close: 181.88, volume: 1234567 },
            { date: "2026-01-16T00:00:00.000Z", open: 178.88, high: 181.44, low: 178.22, close: 180.33, volume: 1182345 },
            { date: "2026-01-15T00:00:00.000Z", open: 179.33, high: 182.22, low: 178.77, close: 180.88, volume: 1209876 },
            { date: "2026-01-14T00:00:00.000Z", open: 177.55, high: 180.33, low: 176.88, close: 179.22, volume: 1154432 },
            { date: "2026-01-13T00:00:00.000Z", open: 176.22, high: 179.22, low: 175.77, close: 177.88, volume: 1123345 }
        ]
    }
},
{
    symbol: "PFE",
    name: "Pfizer",
    industry: "Healthcare",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392358/Pfizer_qgckk1.svg",
    companyProfile: {
        ipo: "1942-06-22",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/PFE.png",
        name: "Pfizer Inc",
        phone: "12125782000",
        ticker: "PFE",
        weburl: "https://www.pfizer.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Healthcare",
        estimateCurrency: "USD",
        shareOutstanding: 6000,
        marketCapitalization: 225000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 49.22, high: 50.44, low: 48.77, close: 50.12, volume: 543211 },
            { date: "2026-01-16T00:00:00.000Z", open: 48.88, high: 50.22, low: 48.22, close: 49.55, volume: 512345 },
            { date: "2026-01-15T00:00:00.000Z", open: 49.12, high: 50.88, low: 48.88, close: 50.22, volume: 523112 },
            { date: "2026-01-14T00:00:00.000Z", open: 48.22, high: 49.88, low: 47.77, close: 49.12, volume: 501223 },
            { date: "2026-01-13T00:00:00.000Z", open: 47.88, high: 49.22, low: 47.33, close: 48.44, volume: 498112 }
        ]
    }
},
{
    symbol: "UNH",
    name: "UnitedHealth Group",
    industry: "Healthcare",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392357/UnitedHealth_ejfdjm.svg",
    companyProfile: {
        ipo: "1984-05-01",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/UNH.png",
        name: "UnitedHealth Group Incorporated",
        phone: "18553704200",
        ticker: "UNH",
        weburl: "https://www.unitedhealthgroup.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Healthcare",
        estimateCurrency: "USD",
        shareOutstanding: 1100,
        marketCapitalization: 500000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 510.22, high: 515.44, low: 508.77, close: 512.88, volume: 234567 },
            { date: "2026-01-16T00:00:00.000Z", open: 508.88, high: 514.22, low: 507.22, close: 511.55, volume: 212345 },
            { date: "2026-01-15T00:00:00.000Z", open: 509.12, high: 515.88, low: 508.88, close: 513.22, volume: 223112 },
            { date: "2026-01-14T00:00:00.000Z", open: 506.22, high: 512.88, low: 505.77, close: 510.12, volume: 201223 },
            { date: "2026-01-13T00:00:00.000Z", open: 504.88, high: 511.22, low: 503.33, close: 508.44, volume: 198112 }
        ]
    }
},
{
    symbol: "XOM",
    name: "Exxon Mobil",
    industry: "Energy",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392357/Exxon_shwdlt.svg",
    companyProfile: {
        ipo: "1920-10-30",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/XOM.png",
        name: "Exxon Mobil Corporation",
        phone: "12322510000",
        ticker: "XOM",
        weburl: "https://corporate.exxonmobil.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Energy",
        estimateCurrency: "USD",
        shareOutstanding: 4300,
        marketCapitalization: 480000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 123.22, high: 125.33, low: 122.44, close: 124.88, volume: 1543210 },
            { date: "2026-01-16T00:00:00.000Z", open: 122.88, high: 124.44, low: 121.77, close: 123.55, volume: 1498765 },
            { date: "2026-01-15T00:00:00.000Z", open: 123.33, high: 125.22, low: 122.88, close: 124.22, volume: 1523344 },
            { date: "2026-01-14T00:00:00.000Z", open: 121.55, high: 124.33, low: 121.11, close: 123.22, volume: 1478901 },
            { date: "2026-01-13T00:00:00.000Z", open: 120.22, high: 123.22, low: 119.77, close: 121.88, volume: 1454321 }
        ]
    }
},
{
    symbol: "CVX",
    name: "Chevron",
    industry: "Energy",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392357/Chevron_cdxodu.svg",
    companyProfile: {
        ipo: "1929-09-01",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/CVX.png",
        name: "Chevron Corporation",
        phone: "18007427600",
        ticker: "CVX",
        weburl: "https://www.chevron.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Energy",
        estimateCurrency: "USD",
        shareOutstanding: 1900,
        marketCapitalization: 350000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 185.22, high: 187.44, low: 184.77, close: 186.88, volume: 1123456 },
            { date: "2026-01-16T00:00:00.000Z", open: 184.88, high: 186.55, low: 183.44, close: 185.33, volume: 1087654 },
            { date: "2026-01-15T00:00:00.000Z", open: 185.12, high: 187.22, low: 184.88, close: 186.22, volume: 1109876 },
            { date: "2026-01-14T00:00:00.000Z", open: 183.44, high: 186.33, low: 182.88, close: 185.12, volume: 1076543 },
            { date: "2026-01-13T00:00:00.000Z", open: 182.22, high: 184.88, low: 181.77, close: 183.88, volume: 1054321 }
        ]
    }
}
,
{
    symbol: "F",
    name: "Ford",
    industry: "Automotive & Industrials",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/Ford_alifpq.svg",
    companyProfile: {
        ipo: "1956-01-17",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/F.png",
        name: "Ford Motor Company",
        phone: "13139233000",
        ticker: "F",
        weburl: "https://www.ford.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Automotive",
        estimateCurrency: "USD",
        shareOutstanding: 4000,
        marketCapitalization: 56000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 12.22, high: 12.55, low: 11.88, close: 12.33, volume: 2543210 },
            { date: "2026-01-16T00:00:00.000Z", open: 12.11, high: 12.44, low: 11.77, close: 12.22, volume: 2498765 },
            { date: "2026-01-15T00:00:00.000Z", open: 12.33, high: 12.66, low: 12.00, close: 12.44, volume: 2523344 },
            { date: "2026-01-14T00:00:00.000Z", open: 12.00, high: 12.44, low: 11.88, close: 12.11, volume: 2478901 },
            { date: "2026-01-13T00:00:00.000Z", open: 11.88, high: 12.22, low: 11.55, close: 12.00, volume: 2454321 }
        ]
    }
},
{
    symbol: "BA",
    name: "Boeing",
    industry: "Automotive & Industrials",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/boeing_jtvh8f.svg",
    companyProfile: {
        ipo: "1962-04-25",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/BA.png",
        name: "Boeing Company",
        phone: "13128591000",
        ticker: "BA",
        weburl: "https://www.boeing.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Aerospace",
        estimateCurrency: "USD",
        shareOutstanding: 560,
        marketCapitalization: 123000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 215.22, high: 218.44, low: 213.88, close: 216.88, volume: 1234567 },
            { date: "2026-01-16T00:00:00.000Z", open: 214.88, high: 217.22, low: 213.55, close: 215.44, volume: 1187654 },
            { date: "2026-01-15T00:00:00.000Z", open: 215.33, high: 218.00, low: 214.88, close: 216.22, volume: 1209876 },
            { date: "2026-01-14T00:00:00.000Z", open: 213.55, high: 216.33, low: 212.88, close: 215.12, volume: 1176543 },
            { date: "2026-01-13T00:00:00.000Z", open: 212.22, high: 215.22, low: 211.77, close: 213.88, volume: 1154321 }
        ]
    }
}
,
{
    symbol: "DIS",
    name: "Disney",
    industry: "Entertainment & Communications",
    logoURL: "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392356/disneyplus_cjxrfs.svg",
    companyProfile: {
        ipo: "1957-11-12",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/DIS.png",
        name: "The Walt Disney Company",
        phone: "13125588800",
        ticker: "DIS",
        weburl: "https://www.thewaltdisneycompany.com/",
        country: "US",
        currency: "USD",
        exchange: "NYSE - NEW YORK STOCK EXCHANGE",
        finnhubIndustry: "Entertainment",
        estimateCurrency: "USD",
        shareOutstanding: 1600,
        marketCapitalization: 320000000000
    },
    data: {
        meta: {
            date_from: "2026-01-13",
            date_to: "2026-01-20",
            max_period_days: 5
        },
        data: [
            { date: "2026-01-20T00:00:00.000Z", open: 150.22, high: 152.44, low: 148.88, close: 151.88, volume: 1345678 },
            { date: "2026-01-16T00:00:00.000Z", open: 149.88, high: 151.22, low: 148.55, close: 150.44, volume: 1287654 },
            { date: "2026-01-15T00:00:00.000Z", open: 150.33, high: 152.00, low: 149.88, close: 151.22, volume: 1309876 },
            { date: "2026-01-14T00:00:00.000Z", open: 148.55, high: 151.33, low: 147.88, close: 150.12, volume: 1276543 },
            { date: "2026-01-13T00:00:00.000Z", open: 147.22, high: 150.22, low: 146.77, close: 148.88, volume: 1254321 }
        ]
    }
}
]

export default mockedData;





