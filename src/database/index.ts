import {
	createConnection as createTypeormConnection,
	getConnection as getTypeormConnection,
} from 'typeorm';
import { databaseConfig } from '../config/database';

export async function createConnection() {
	await createTypeormConnection(databaseConfig);
}

export async function closeConnection() {
	await getTypeormConnection().close();
}

export async function truncateAllTables() {
	const connection = getTypeormConnection();
	const entities = connection.entityMetadatas;

	await Promise.all(
		entities.map(async (entity) => {
			const repository = connection.getRepository(entity.name);
			await repository.query(`DELETE FROM ${entity.tableName}`);
		})
	);
}
