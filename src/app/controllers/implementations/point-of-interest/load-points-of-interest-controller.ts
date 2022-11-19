import { Request, Response } from 'express';

import { IController } from '../../interfaces';
import { ILoadPointsOfInterest } from '../../../usecases/interfaces';

export class LoadPointsOfInterestController implements IController {
	constructor(private readonly loadPointsOfInterest: ILoadPointsOfInterest) {}

	async handle(_: Request, response: Response) {
		try {
			const pointsOfInterest = await this.loadPointsOfInterest.execute();
			return response.status(200).json({ pointsOfInterest });
		} catch (error) {
			return response.status(500).send(error.stack);
		}
	}
}
