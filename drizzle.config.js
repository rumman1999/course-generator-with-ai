// Import and configure dotenv
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./config/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL,
    }
};

console.log("db url", process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL);
