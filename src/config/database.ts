const envs = {
	production: '.env',
	development: '.env.dev',
	test: '.env.test',
};

require('dotenv').config({
	path: envs[process.env.NODE_ENV || 'development'],
});

import { ConnectionOptions } from 'typeorm';

const databaseConfig: ConnectionOptions = {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: ['src/app/entities/*.ts'],
	synchronize: true,
} as ConnectionOptions;

export { databaseConfig };
