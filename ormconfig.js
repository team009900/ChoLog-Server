const ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "ChoLog",
  synchronize: false, //db테이블이랑 schema랑 일치 시키는 것.
  logging: false,
  entities: ["build/entity/**/*.js"],
  migrations: ["build/migration/**/*.js"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

if (process.env.NODE_ENV === "production") {
  ConnectionOptions.database = "ChoLog_prod";
}

module.exports = ConnectionOptions;
