import { ILoadPointsOfInterestRepository } from '../../repositories/interfaces';
import { PointOfInterestModel } from '../../models';
import { DbLoadPointsOfInterest } from './db-load-points-of-interest';

const mockPOIModel = (number?: number): PointOfInterestModel => ({
	id: `Mocked Id ${number}`,
	name: 'Mocked Name',
	x_coordinate: 1,
	y_coordinate: 2,
});

const mockPOIModelList = () => [
	mockPOIModel(1),
	mockPOIModel(2),
	mockPOIModel(3),
];

class LoadPOIsRepositoryStub implements ILoadPointsOfInterestRepository {
	async loadAll(): Promise<PointOfInterestModel[]> {
		return mockPOIModelList();
	}
}

type SutTypes = {
	sut: DbLoadPointsOfInterest;
	loadPOIsRepositoryStub: ILoadPointsOfInterestRepository;
};

const makeSut = (): SutTypes => {
	const loadPOIsRepositoryStub = new LoadPOIsRepositoryStub();
	const sut = new DbLoadPointsOfInterest(loadPOIsRepositoryStub);
	return {
		sut,
		loadPOIsRepositoryStub,
	};
};

describe('DbLoadPointsOfInterest Usecase', () => {
	it('Should call loadPOIsRepository', async () => {
		const { sut, loadPOIsRepositoryStub } = makeSut();
		const loadAllSpy = jest.spyOn(loadPOIsRepositoryStub, 'loadAll');
		await sut.execute();
		expect(loadAllSpy).toHaveBeenCalledTimes(1);
	});

	it('Should throw if loadPOIsRepository throws', async () => {
		const { sut, loadPOIsRepositoryStub } = makeSut();
		jest
			.spyOn(loadPOIsRepositoryStub, 'loadAll')
			.mockReturnValueOnce(Promise.reject(new Error('mocked_error')));
		const promise = sut.execute();
		await expect(promise).rejects.toThrow(new Error('mocked_error'));
	});

	it('Should return a list of PointOfInterestModel on success', async () => {
		const { sut } = makeSut();
		const pointsOfInterests = await sut.execute();
		expect(pointsOfInterests).toEqual(mockPOIModelList());
	});
});
