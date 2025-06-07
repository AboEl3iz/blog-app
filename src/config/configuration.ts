export default () => ({
  port: Number(process.env.PORT) || 3000,
  database: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET
});