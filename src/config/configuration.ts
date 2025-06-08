export default () => ({
  port: Number(process.env.PORT) || 3000,
  database: {
    connectionString: process.env.DATABASE_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  accessadmin: process.env.ADMIN_TOKEN ,
});