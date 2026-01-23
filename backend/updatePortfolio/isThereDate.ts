import { Prisma } from "../prisma/generated/prisma/client.ts";

export default function isThereDate(array: Array<Prisma.JsonValue>, date: string) {
  let returningValue = null;

  array.forEach((day, index) => {
    if (typeof day !== 'object' || day === null || Array.isArray(day)) return
    if (day.date === date) {
      returningValue = index
    }
    
  })

  return returningValue
  

}