import { Request, Response } from 'express';

import { IController } from '../../interfaces/controller';
import { ISavePointOfInterest } from '../../../usecases/interfaces';

export class CreatePointOfInterestController implements IController {
	constructor(private readonly savePointOfInterest: ISavePointOfInterest) {}

	async handle(request: Request, response: Response) {
		try {
			const requiredParams = ['name', 'x_coordinate', 'y_coordinate'];
			const missingParams = [];

			requiredParams.forEach((param) => {
				if (!Object.keys(request.body).includes(param)) {
					missingParams.push(param);
				}
			});

			if (missingParams.length > 0) {
				return response.status(400).json({
					error: 'Missing params',
					value: missingParams,
				});
			}

			const { name, x_coordinate, y_coordinate } = request.body;

			if (
				!Number.isInteger(x_coordinate) ||
				!Number.isInteger(y_coordinate) ||
				x_coordinate < 0 ||
				y_coordinate < 0
			) {
				return response.status(400).json({
					error: 'Invalid coordinates. Both coordinates must be positive integers.',
				});
			}

			const pointOfInterest = await this.savePointOfInterest.execute({
				name,
				x_coordinate: Number(x_coordinate),
				y_coordinate: Number(y_coordinate),
			});

			return response.status(200).json({ pointOfInterest });
		} catch (error) {
			return response.status(500).send(error.stack);
		}
	}
}
