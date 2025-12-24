import type { Dispatch, SetStateAction } from "react";
import { MainMenu } from "../../../shared/MainMenu";

type StockPageProps = { isLogged: boolean; setIsLogged: Dispatch<SetStateAction<boolean>>; user?: { email?: string } | null }

export function StockPage({ isLogged, setIsLogged, user }: StockPageProps) {
  return (
    <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} user={user} />
  )
}