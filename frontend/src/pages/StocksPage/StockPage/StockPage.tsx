import type { Dispatch, SetStateAction } from "react";
import { MainMenu } from "../../../shared/MainMenu";

type StockPageProps = { isLogged: boolean; setIsLogged: Dispatch<SetStateAction<boolean>>; userEmail?: string | undefined;}

export function StockPage({ isLogged, setIsLogged, userEmail }: StockPageProps) {
  return (
    <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} userEmail={userEmail} />
  )
}