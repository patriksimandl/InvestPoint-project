import {MainMenu} from '../../shared/MainMenu'
import './HomePage.css'

export function HomePage({islogged}:{islogged:boolean}){
  return (
    <>
      <MainMenu islogged={islogged} />
    </>

  )
}