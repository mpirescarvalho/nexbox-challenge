import request from 'supertest';
import { app } from '../../../../app';
import {
	createConnection,
	closeConnection,
	truncateAllTables,
} from '../../../../database';

describe('Find Nearby Points of Interest Controller', () => {
	beforeAll(async () => {
		await createConnection();
	});

	afterAll(async () => {
		await closeConnection();
	});

	beforeEach(async () => {
		await truncateAllTables();
	});

	it('Should fail with missing or invalid params', async () => {
		let response;

		response = await request(app).post('/pois/nearby').send({
			x_coordinate: 1,
			y_coordinate: 2,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois/nearby').send({
			max_distance: 1,
			y_coordinate: 2,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois/nearby').send({
			max_distance: 1,
			x_coordinate: 1,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois/nearby').send({
			max_distance: '1',
			x_coordinate: -1,
			y_coordinate: 2,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois/nearby').send({
			max_distance: -1,
			x_coordinate: 1,
			y_coordinate: 2.2,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois/nearby').send({
			max_distance: 1,
			x_coordinate: '1',
			y_coordinate: 2,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois/nearby').send({
			max_distance: '1',
			x_coordinate: 1,
			y_coordinate: 2,
		});
		expect(response.status).toBe(400);
	});

	it('Should load nearby points of interest', async () => {
		const pointsOfInterest = [
			{
				name: 'Lanchonete',
				x_coordinate: 27,
				y_coordinate: 12,
			},
			{
				name: 'Posto',
				x_coordinate: 31,
				y_coordinate: 18,
			},
			{
				name: 'Joalheria',
				x_coordinate: 15,
				y_coordinate: 12,
			},
			{
				name: 'Floricultura',
				x_coordinate: 19,
				y_coordinate: 21,
			},
			{
				name: 'Pub',
				x_coordinate: 12,
				y_coordinate: 8,
			},
			{
				name: 'Supermercado',
				x_coordinate: 23,
				y_coordinate: 6,
			},
			{
				name: 'Churrascaria',
				x_coordinate: 28,
				y_coordinate: 2,
			},
		];

		await Promise.all(
			pointsOfInterest.map(async (poi) => {
				await request(app).post('/pois').send(poi);
			})
		);

		let response;

		response = await request(app).post('/pois/nearby').send({
			x_coordinate: 20,
			y_coordinate: 10,
			max_distance: 1,
		});
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('nearbyPointsOfInterest');
		expect(response.body.nearbyPointsOfInterest.length).toBe(0);

		response = await request(app).post('/pois/nearby').send({
			x_coordinate: 20,
			y_coordinate: 10,
			max_distance: 10,
		});
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('nearbyPointsOfInterest');
		expect(response.body.nearbyPointsOfInterest.length).toBe(4);

		response = await request(app).post('/pois/nearby').send({
			x_coordinate: 20,
			y_coordinate: 10,
			max_distance: 6,
		});
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('nearbyPointsOfInterest');
		expect(response.body.nearbyPointsOfInterest.length).toBe(2);
	});
});
