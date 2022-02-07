require('dotenv/config');

const config = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    uuidExtension: 'pgcrypto',
    entities: ['dist/modules/**/*.entity{.ts,.js}'],
    migrations: ['dist/modules/shared/database/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: './src/modules/shared/database/migrations',
    },
  },
  // {
  //   name: 'mongo',
  //   type: 'mongodb',
  //   host: process.env.MONGO_HOST,
  //   port: 27017,
  //   database: process.env.MONGO_NAME,
  //   useUnifiedTopology: true,
  //   entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  // },
];

module.exports = config;