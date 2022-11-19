import { PointOfInterestModel } from '../../models';
import {
	IFindNearbyPointsOfInterest,
	FindNearbyPointsOfInterestParams,
} from '../interfaces';
import { ILoadPointsOfInterestRepository } from '../../repositories/interfaces';
import { IPointDistanceCalculator } from '../../utils/point-distance-calculator';

export class DbFindNearbyPointsOfInterest
	implements IFindNearbyPointsOfInterest
{
	constructor(
		private readonly loadPointsOfInterestRepository: ILoadPointsOfInterestRepository,
		private readonly pointDistanceCalculator: IPointDistanceCalculator
	) {}

	async execute(
		params: FindNearbyPointsOfInterestParams
	): Promise<PointOfInterestModel[]> {
		const pointsOfInterest = await this.loadPointsOfInterestRepository.loadAll();

		const nearbyPointsOfInterest = pointsOfInterest.filter((poi) => {
			const referencePoint = {
				x_coordinate: params.x_coordinate,
				y_coordinate: params.y_coordinate,
			};
			const pointOfInterest = {
				x_coordinate: poi.x_coordinate,
				y_coordinate: poi.y_coordinate,
			};

			const distance = this.pointDistanceCalculator.calculate(
				referencePoint,
				pointOfInterest
			);

			return distance <= params.max_distance;
		});

		return nearbyPointsOfInterest;
	}
}
