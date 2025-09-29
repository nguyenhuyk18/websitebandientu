// import { RedisStore } from "connect-redis";
const { RedisStore } = require('connect-redis');
const { createClient } = require('redis');

// Initialize client.
const redisClient = createClient(
    {
        socket: {
            host: "127.0.0.1",
            port: 6379
        }
    }
)
redisClient.connect().catch(console.error)

// Initialize store.
const redisStore = new RedisStore({
    client: redisClient,
    prefix: "sess:",
})

module.exports = redisStore;

