import { PointOfInterestModel } from '../../models';
import { ISavePointOfInterest, SavePointOfInterestParams } from '../interfaces';
import { ISavePointOfInterestRepository } from '../../repositories/interfaces';

export class DbSavePointOfInterest implements ISavePointOfInterest {
	constructor(
		private readonly savePointOfInterestRepository: ISavePointOfInterestRepository
	) {}

	async execute(data: SavePointOfInterestParams): Promise<PointOfInterestModel> {
		const pointOfInterest = await this.savePointOfInterestRepository.save(data);
		return pointOfInterest;
	}
}
