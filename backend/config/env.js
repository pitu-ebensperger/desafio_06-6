import dotenv from "dotenv";

dotenv.config();

export const env = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,

};

const fallbackPort = process.env.PORT || 3000;

export const appConfig = {
  port: Number(fallbackPort) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  domainUrl: process.env.DOMAIN_URL_APP || `http://localhost:${fallbackPort}`,
};

