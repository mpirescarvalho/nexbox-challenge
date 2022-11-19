import request from 'supertest';
import { app } from '../../../../app';
import {
	createConnection,
	closeConnection,
	truncateAllTables,
} from '../../../../database';

describe('Create Point of Interest Controller', () => {
	beforeAll(async () => {
		await createConnection();
	});

	afterAll(async () => {
		await closeConnection();
	});

	beforeEach(async () => {
		await truncateAllTables();
	});

	it('Should not create a point of interest with missing or invalid params', async () => {
		let response;

		response = await request(app).post('/pois').send({
			x_coordinate: 1,
			y_coordinate: 2,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois').send({
			name: 'point 1',
			y_coordinate: 2,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois').send({
			name: 'point 1',
			x_coordinate: 1,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois').send({
			name: 'point 1',
			x_coordinate: -1,
			y_coordinate: 2,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois').send({
			name: 'point 1',
			x_coordinate: 1,
			y_coordinate: 2.2,
		});
		expect(response.status).toBe(400);

		response = await request(app).post('/pois').send({
			name: 'point 1',
			x_coordinate: '1',
			y_coordinate: 2,
		});
		expect(response.status).toBe(400);
	});

	it('Should create a point of interest', async () => {
		const response = await request(app).post('/pois').send({
			name: 'point 1',
			x_coordinate: 1,
			y_coordinate: 2,
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('pointOfInterest');
		expect(response.body.pointOfInterest.id).toBeTruthy();
		expect(response.body.pointOfInterest.name).toBe('point 1');
		expect(response.body.pointOfInterest.x_coordinate).toBe(1);
		expect(response.body.pointOfInterest.y_coordinate).toBe(2);
	});
});
