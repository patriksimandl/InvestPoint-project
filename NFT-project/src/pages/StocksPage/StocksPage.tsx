import { MainMenu } from "../../shared/MainMenu";
import './StocksPage.css'


export function StocksPage(){
  return (
    <>
      <MainMenu />
      <div className="stocks-page-container">
        <div className="stocks-grid">
          <div className="stock-container ">
            <div>a</div>
            <div>a</div>
            <div>a</div>
          </div>
          <div className="stock-container ">da</div>
          <div className="stock-container ">adad</div>
        </div>
      </div>
    </>

  )
}