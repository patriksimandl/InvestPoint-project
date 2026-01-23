import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './prisma/generated/prisma/client.ts'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const db = new PrismaClient({ adapter })


export default db;
//create a prisma client with the video;