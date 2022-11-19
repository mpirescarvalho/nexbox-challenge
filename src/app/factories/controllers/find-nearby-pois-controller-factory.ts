import { FindNearbyPOIsController } from '../../controllers/implementations';
import { IController } from '../../controllers/interfaces';
import { PointOfInterestRepository } from '../../repositories/implementations';
import { DbFindNearbyPointsOfInterest } from '../../usecases/implementations';
import { PointDistanceCalculator } from '../../utils/point-distance-calculator';

export function FindNearbyPOIsControllerFactory(): IController {
	const pointOfInterestRepository = new PointOfInterestRepository();
	const pointDistanceCalculator = new PointDistanceCalculator();
	const dbFindNearbyPointsOfInterest = new DbFindNearbyPointsOfInterest(
		pointOfInterestRepository,
		pointDistanceCalculator
	);
	const controller = new FindNearbyPOIsController(dbFindNearbyPointsOfInterest);
	return controller;
}
