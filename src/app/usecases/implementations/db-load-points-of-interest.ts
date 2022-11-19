import { PointOfInterestModel } from '../../models';
import { ILoadPointsOfInterest } from '../interfaces';
import { ILoadPointsOfInterestRepository } from '../../repositories/interfaces';

export class DbLoadPointsOfInterest implements ILoadPointsOfInterest {
	constructor(
		private readonly loadPointsOfInterestRepository: ILoadPointsOfInterestRepository
	) {}

	async execute(): Promise<PointOfInterestModel[]> {
		const pointsOfInterest = await this.loadPointsOfInterestRepository.loadAll();
		return pointsOfInterest;
	}
}
