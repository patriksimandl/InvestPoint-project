import { MainMenu } from '../../shared/MainMenu'
import './HomePage.css'
import type { Dispatch, SetStateAction } from 'react'

type HomePageProps = {
  isLogged: boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  userEmail: string | undefined;
}



export function HomePage({ isLogged, setIsLogged, userEmail }: HomePageProps) {
  return (
    <>
      <title>Home</title>
      <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} userEmail={userEmail} />
    </>

  )
}