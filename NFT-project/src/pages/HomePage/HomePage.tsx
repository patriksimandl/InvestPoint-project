import {MainMenu} from '../../shared/MainMenu'
import './HomePage.css'

export function HomePage({logged}:{logged:boolean}){
  return (
    <>
      <MainMenu logged={logged} />
    </>
    
  )
}