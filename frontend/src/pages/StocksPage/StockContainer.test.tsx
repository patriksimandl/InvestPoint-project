//import { describe,beforeEach,it,expect, } from "@jest/globals";

import { expect ,it,beforeEach,describe, test} from 'vitest'
import { StockContainer } from "/Pata/InvestPoint-project/frontend/src/pages/StocksPage/StockContainer.tsx";
import {render, screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router';

describe('Stock Container',
  ()=>{
    let stock : {
      name: string,
      symbol: string,
      logoURL: string,
      data: {
        meta:{}
        data: {
          date:string,
          low: number,
          high: number,
          close: number,
          open: number,
          volume: number,
        }[]
      }

    }
  
    beforeEach(()=>{
      stock = {
        "name": "Adobe",
        "symbol": "ADBE",
        "logoURL": "https://res.cloudinary.com/dqdwgkwfn/image/upload/v1765392365/adobe_t4hgvc.svg",
        "data": {
            "meta" : {},
            "data": [
                {
                    "low": 245.24,
                    "date": "2026-03-18T00:00:00.000Z",
                    "high": 254.44,
                    "open": 252.25,
                    "close": 245.99,
                    "volume": 173392
                },
                {
                    "low": 244.61,
                    "date": "2026-03-16T00:00:00.000Z",
                    "high": 256.35,
                    "open": 248.25,
                    "close": 251.85,
                    "volume": 431618
                },
                {
                    "low": 247.56,
                    "date": "2026-03-13T00:00:00.000Z",
                    "high": 256.6,
                    "open": 248.99,
                    "close": 249.29,
                    "volume": 481453
                },
                {
                    "low": 269.3,
                    "date": "2026-03-12T00:00:00.000Z",
                    "high": 276.21,
                    "open": 273.46,
                    "close": 270.1,
                    "volume": 267812
                },
                {
                    "low": 269.32,
                    "date": "2026-03-11T00:00:00.000Z",
                    "high": 280.21,
                    "open": 277.16,
                    "close": 273.67,
                    "volume": 165968
                },
                {
                    "low": 268.47,
                    "date": "2026-03-10T00:00:00.000Z",
                    "high": 282.37,
                    "open": 282.37,
                    "close": 275.08,
                    "volume": 212495
                },
                {
                    "low": 277.98,
                    "date": "2026-03-09T00:00:00.000Z",
                    "high": 284.93,
                    "open": 281.56,
                    "close": 282.37,
                    "volume": 154887
        }]}
    }});

    it('Renders correctly',()=>{
        render(
          <MemoryRouter>
            <StockContainer stock={stock} watchlist={undefined}></StockContainer>
          </MemoryRouter>
        )

        expect(screen.getByText('ADBE')).toBeInTheDocument();
        expect(screen.getByText('Adobe')).toBeInTheDocument();
        expect(screen.getByTestId('select-button')).toBeInTheDocument();

    })

    



    


      expect(
        2
      ).toBe(2);

    
  }
)