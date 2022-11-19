import { ILoadPointsOfInterestRepository } from '../../repositories/interfaces';
import {
	IPointDistanceCalculator,
	PointDistanceCalculator,
} from '../../utils/point-distance-calculator';
import { DbFindNearbyPointsOfInterest } from './db-find-nearby-points-of-interest';
import { FindNearbyPointsOfInterestParams } from '../interfaces';
import { PointOfInterestModel } from '../../models';

const mockPOIModel = (
	name: string,
	x: number,
	y: number
): PointOfInterestModel => ({
	id: 'Mocked Id',
	name,
	x_coordinate: x,
	y_coordinate: y,
});

const mockPOIModelList = () => [
	mockPOIModel('any_name1', 27, 12),
	mockPOIModel('any_name2', 31, 18),
	mockPOIModel('any_name3', 15, 12),
	mockPOIModel('any_name4', 19, 21),
	mockPOIModel('any_name5', 12, 8),
	mockPOIModel('any_name6', 23, 6),
	mockPOIModel('any_name7', 28, 2),
];

const mockFindNearbyPOIsParams = (): FindNearbyPointsOfInterestParams => ({
	max_distance: 10,
	x_coordinate: 20,
	y_coordinate: 10,
});

class LoadPOIsRepositoryStub implements ILoadPointsOfInterestRepository {
	async loadAll(): Promise<PointOfInterestModel[]> {
		return mockPOIModelList();
	}
}

type SutTypes = {
	sut: DbFindNearbyPointsOfInterest;
	loadPOIsRepositoryStub: ILoadPointsOfInterestRepository;
	pointDistanceCalculator: IPointDistanceCalculator;
};

const makeSut = (): SutTypes => {
	const loadPOIsRepositoryStub = new LoadPOIsRepositoryStub();
	const pointDistanceCalculator = new PointDistanceCalculator();
	const sut = new DbFindNearbyPointsOfInterest(
		loadPOIsRepositoryStub,
		pointDistanceCalculator
	);
	return {
		sut,
		loadPOIsRepositoryStub,
		pointDistanceCalculator,
	};
};

describe('DbFindNearbyPointsOfInterest Usecase', () => {
	it('Should call loadPOIsRepository', async () => {
		const { sut, loadPOIsRepositoryStub } = makeSut();
		const loadAllSpy = jest.spyOn(loadPOIsRepositoryStub, 'loadAll');
		await sut.execute(mockFindNearbyPOIsParams());
		expect(loadAllSpy).toHaveBeenCalled();
	});

	it('Should throw if loadPOIsRepository throws', async () => {
		const { sut, loadPOIsRepositoryStub } = makeSut();
		jest
			.spyOn(loadPOIsRepositoryStub, 'loadAll')
			.mockReturnValueOnce(Promise.reject(new Error('mocked_error')));
		const promise = sut.execute(mockFindNearbyPOIsParams());
		await expect(promise).rejects.toThrow(new Error('mocked_error'));
	});

	it('Should call pointDistanceCalculator once for every stored POI', async () => {
		const { sut, pointDistanceCalculator } = makeSut();
		const calculateSpy = jest.spyOn(pointDistanceCalculator, 'calculate');

		const params = mockFindNearbyPOIsParams();

		await sut.execute(params);

		const referencePoint = {
			x_coordinate: params.x_coordinate,
			y_coordinate: params.y_coordinate,
		};

		mockPOIModelList().forEach((poi, index) => {
			const pointOfInterest = {
				x_coordinate: poi.x_coordinate,
				y_coordinate: poi.y_coordinate,
			};

			expect(calculateSpy).toHaveBeenNthCalledWith(
				index + 1,
				referencePoint,
				pointOfInterest
			);
		});
	});

	it('Should return a list of nearby PointOfInterestModel on success', async () => {
		const { sut } = makeSut();
		const nearbyPointsOfInterest = await sut.execute(mockFindNearbyPOIsParams());
		expect(nearbyPointsOfInterest.length).toEqual(4);
		expect(nearbyPointsOfInterest[0].name).toEqual('any_name1');
		expect(nearbyPointsOfInterest[1].name).toEqual('any_name3');
		expect(nearbyPointsOfInterest[2].name).toEqual('any_name5');
		expect(nearbyPointsOfInterest[3].name).toEqual('any_name6');
	});
});
