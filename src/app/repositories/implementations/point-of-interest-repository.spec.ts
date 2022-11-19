import { PointOfInterestRepository } from './point-of-interest-repository';
import {
	createConnection,
	closeConnection,
	truncateAllTables,
} from '../../../database/index';

describe('Point of Interest Repository', () => {
	let sut: PointOfInterestRepository;

	beforeAll(async () => {
		await createConnection();
	});

	afterAll(async () => {
		await closeConnection();
	});

	beforeEach(async () => {
		await truncateAllTables();
		sut = new PointOfInterestRepository();
	});

	it('Should add a new point of interest', async () => {
		const pointOfInterest = await sut.save({
			name: 'any_name',
			x_coordinate: 1,
			y_coordinate: 2,
		});

		expect(pointOfInterest).toHaveProperty('id');
		expect(pointOfInterest.id).toBeTruthy();
		expect(pointOfInterest.name).toEqual('any_name');
	});

	it('Should load all points of interest', async () => {
		let pointsOfInterest;

		pointsOfInterest = await sut.loadAll();
		expect(pointsOfInterest).toEqual([]);

		const pointOfInterest1 = await sut.save({
			name: 'any_name1',
			x_coordinate: 1,
			y_coordinate: 2,
		});

		const pointOfInterest2 = await sut.save({
			name: 'any_name2',
			x_coordinate: 5,
			y_coordinate: 6,
		});

		pointsOfInterest = await sut.loadAll();

		expect(pointsOfInterest.length).toEqual(2);
		expect(pointsOfInterest[0].id).toBe(pointOfInterest1.id);
		expect(pointsOfInterest[1].id).toBe(pointOfInterest2.id);
	});
});
