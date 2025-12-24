import { MainMenu } from '../../shared/MainMenu'
import './HomePage.css'
import type { Dispatch, SetStateAction } from 'react'

type HomePageProps = {
  isLogged: boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  user?: { email?: string } | null,
}



export function HomePage({ isLogged, setIsLogged, user }: HomePageProps) {
  return (
    <>
      <title>Home</title>
      <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} user={user} />
    </>

  )
}