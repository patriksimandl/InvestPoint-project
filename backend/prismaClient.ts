import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './prisma/generated/prisma/client.ts'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const db = new PrismaClient({ adapter })

  
export default db;
//create a prisma client with the video;



export async function dbQuery<T>(fn: () => Promise<T>):Promise<T> {
  try{
    return await fn()
  }
  catch(error:any){
    if(
      error.code === 'P1017' ||
      error.message?.includes('Connection') ||
      error.message?.includes('terminated')
    ){
      console.warn('🔄 Trying to Reconnect to DB...')


      await db.$disconnect();
      await db.$connect();

      return await fn();
    }
    throw error
  }

  
}