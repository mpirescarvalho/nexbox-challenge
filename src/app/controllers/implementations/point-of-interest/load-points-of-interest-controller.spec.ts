import request from 'supertest';
import { app } from '../../../../app';
import {
	createConnection,
	closeConnection,
	truncateAllTables,
} from '../../../../database';

describe('Load Points of Interest Controller', () => {
	beforeAll(async () => {
		await createConnection();
	});

	afterAll(async () => {
		await closeConnection();
	});

	beforeEach(async () => {
		await truncateAllTables();
	});

	it('Should load all points', async () => {
		let response;

		response = await request(app).get('/pois');

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('pointsOfInterest');
		expect(response.body.pointsOfInterest.length).toBe(0);

		await request(app).post('/pois').send({
			name: 'point 1',
			x_coordinate: 1,
			y_coordinate: 2,
		});

		await request(app).post('/pois').send({
			name: 'point 2',
			x_coordinate: 5,
			y_coordinate: 10,
		});

		response = await request(app).get('/pois');

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('pointsOfInterest');
		expect(response.body.pointsOfInterest[0].id).toBeTruthy();
		expect(response.body.pointsOfInterest[0].name).toBe('point 1');
		expect(response.body.pointsOfInterest[1].id).toBeTruthy();
	});
});
