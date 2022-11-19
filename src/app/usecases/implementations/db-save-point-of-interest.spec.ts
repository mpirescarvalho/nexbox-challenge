import { ISavePointOfInterestRepository } from '../../repositories/interfaces';
import { PointOfInterestModel } from '../../models';
import { SavePointOfInterestParams } from '../interfaces';
import { DbSavePointOfInterest } from './db-save-point-of-interest';

const mockSavePointOfInterestParams = (): SavePointOfInterestParams => ({
	name: 'Mocked name',
	x_coordinate: 1,
	y_coordinate: 3,
});

const mockPointOfInterestModel = (): PointOfInterestModel => ({
	...mockSavePointOfInterestParams(),
	id: 'Mocked id',
});

class SavePOIRepositoryStub implements ISavePointOfInterestRepository {
	async save(_: SavePointOfInterestParams): Promise<PointOfInterestModel> {
		return mockPointOfInterestModel();
	}
}

type SutTypes = {
	sut: DbSavePointOfInterest;
	savePOIRepositoryStub: ISavePointOfInterestRepository;
};

const makeSut = (): SutTypes => {
	const savePOIRepositoryStub = new SavePOIRepositoryStub();
	const sut = new DbSavePointOfInterest(savePOIRepositoryStub);
	return {
		sut,
		savePOIRepositoryStub,
	};
};

describe('DbSavePointOfInterest Usecase', () => {
	it('Should call savePOIRepository with correct values', async () => {
		const { sut, savePOIRepositoryStub } = makeSut();
		const saveSpy = jest.spyOn(savePOIRepositoryStub, 'save');
		await sut.execute(mockSavePointOfInterestParams());
		expect(saveSpy).toHaveBeenCalledWith(mockSavePointOfInterestParams());
	});

	it('Should throw if savePOIRepository throws', async () => {
		const { sut, savePOIRepositoryStub } = makeSut();
		jest
			.spyOn(savePOIRepositoryStub, 'save')
			.mockReturnValueOnce(Promise.reject(new Error('mocked_error')));
		const promise = sut.execute(mockSavePointOfInterestParams());
		await expect(promise).rejects.toThrow(new Error('mocked_error'));
	});

	it('Should return a PointOfInterestModel on success', async () => {
		const { sut } = makeSut();
		const pointOfInterest = await sut.execute(mockSavePointOfInterestParams());
		expect(pointOfInterest).toEqual(mockPointOfInterestModel());
	});
});
