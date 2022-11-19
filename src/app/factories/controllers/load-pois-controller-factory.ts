import { LoadPointsOfInterestController } from '../../controllers/implementations';
import { IController } from '../../controllers/interfaces';
import { PointOfInterestRepository } from '../../repositories/implementations';
import { DbLoadPointsOfInterest } from '../../usecases/implementations';

export function LoadPOIsControllerFactory(): IController {
	const pointOfInterestRepository = new PointOfInterestRepository();
	const dbLoadPointsOfInterest = new DbLoadPointsOfInterest(
		pointOfInterestRepository
	);
	const controller = new LoadPointsOfInterestController(dbLoadPointsOfInterest);
	return controller;
}
