import type { Request, Response, NextFunction } from "express";

type Record = {
  ip: string,
  count: number
}

const requests: Record[] = [];
const WINDOW_LOG = 1000 * 60;
const MAX_REQ_PER_LOG = 5;


//Implement own rateLimitng by ip for practice

const cache = new Map();



setInterval(() => {
  requests.length = 0;
  cache.clear();
}, WINDOW_LOG)

export async function rateLimitngMiddleware(req: Request, res: Response, next: NextFunction) {
  const { ip } = req;

  if (!ip) return next();


  
    const record = cache.get(ip);

  if(!record){
    cache.set(ip,{countOfRequests: 1});
    console.log(cache);
    return next();
  }


  if (record.countOfRequests >= MAX_REQ_PER_LOG) {
    console.log('Too many requests');
    return res.status(429).send('Too many Requests')
  }
  else {
    record.countOfRequests++;
    console.log(cache);
    return next();
  }


}