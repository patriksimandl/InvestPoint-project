import "dotenv/config";
import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '../generated/prisma/client';

const dbURL =   process.env.DATABASE_URL;//db URL 

const adapter = new PrismaPg({ dbURL});//prisma client driver
export const db = new PrismaClient({adapter});//prisma client constructor


//export {prisma};//exporting the client, which we can then operate with