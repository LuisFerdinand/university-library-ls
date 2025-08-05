import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: config.env.upstashUrl.redisUrl,
  token: config.env.upstashUrl.redisToken,
});

export default redis;
