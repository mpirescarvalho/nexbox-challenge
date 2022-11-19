import { IController } from '../../controllers/interfaces';
import { CreatePointOfInterestController } from '../../controllers/implementations';
import { DbSavePointOfInterest } from '../../usecases/implementations';
import { PointOfInterestRepository } from '../../repositories/implementations';

export function CreatePOIControllerFactory(): IController {
	const pointOfInterestRepository = new PointOfInterestRepository();
	const dbSavePointOfInterest = new DbSavePointOfInterest(
		pointOfInterestRepository
	);
	const controller = new CreatePointOfInterestController(dbSavePointOfInterest);
	return controller;
}
