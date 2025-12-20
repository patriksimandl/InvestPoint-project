import {MainMenu} from '../../shared/MainMenu'
import './HomePage.css'
import type { Dispatch, SetStateAction } from 'react'

export function HomePage({isLogged, setIsLogged}:{isLogged:boolean, setIsLogged: Dispatch<SetStateAction<boolean>>}){
  return (
    <>
      <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} />
    </>

  )
}