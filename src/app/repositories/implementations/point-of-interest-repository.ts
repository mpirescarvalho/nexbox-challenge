import { getRepository } from 'typeorm';

import {
	ILoadPointsOfInterestRepository,
	ISavePointOfInterestRepository,
	SavePOIRepositoryParams,
} from '../interfaces';
import { PointOfInterest } from '../../entities';
import { PointOfInterestModel } from '../../models';

export class PointOfInterestRepository
	implements ISavePointOfInterestRepository, ILoadPointsOfInterestRepository
{
	async save(data: SavePOIRepositoryParams): Promise<PointOfInterestModel> {
		const pointOfInterest = await getRepository(PointOfInterest).save(data);
		return pointOfInterest;
	}

	async loadAll(): Promise<PointOfInterestModel[]> {
		const pointsOfInterest = await getRepository(PointOfInterest).find();
		return pointsOfInterest;
	}
}
