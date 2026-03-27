import type { StockWithLogo } from "./StocksPage";





export function sortSymbols(sort: string, data: StockWithLogo[]) {

  if (sort === 'name-asc') {


    for (let i: number = 0; i < data.length; i++) {

      if (!i) {


        continue;
      };


      const current = data[i];
      const currentSymbol = data[i].symbol;

      let j = i - 1
      while (j >= 0 && data[j].symbol > currentSymbol) {
        j--;
      }


      data.splice(i, 1);
      data.splice(j + 1, 0, current);

    }

    return data
  }
  else if (sort === 'name-desc' ) 
  {
    for (let i: number = 0; i < data.length; i++) {

      if (!i) {


        continue;
      };


      const current = data[i];
      const currentSymbol = data[i].symbol;

      let j = i - 1
      while (j >= 0 && data[j].symbol < currentSymbol) {
        j--;
      }


      data.splice(i, 1);
      data.splice(j + 1, 0, current);

    }

    return data

  }
  else if (sort === 'price-asc') {
    for (let i: number = 0; i < data.length; i++) {

      if (!i) {


        continue;
      };


      const current = data[i];
      const currentPrice = data[i].data.data[0].close;

      let j = i - 1
      while (j >= 0 && data[j].data.data[0].close > currentPrice) {
        j--;
      }


      data.splice(i, 1);
      data.splice(j + 1, 0, current);

    }

    return data
  }else if (sort === 'price-desc') {
    for (let i: number = 0; i < data.length; i++) {

      if (!i) {


        continue;
      };


      const current = data[i];
      const currentPrice = data[i].data.data[0].close;

      let j = i - 1
      while (j >= 0 && data[j].data.data[0].close < currentPrice) {
        j--;
      }


      data.splice(i, 1);
      data.splice(j + 1, 0, current);

    }

    return data
  }

}

