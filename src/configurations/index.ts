export default () => ({
  port: process.env.PORT,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  entities: [/*...*/],
  migrations: [/*...*/],
  migrationsTableName: "custom_migration_table",
  secret_jwt: process.env.JWT_ACCESS_SECRET,
  secret_refresh_jwt: process.env.JWT_REFRESH_SECRET,
  expire_jwt: process.env.EXPIRE_JWT
})