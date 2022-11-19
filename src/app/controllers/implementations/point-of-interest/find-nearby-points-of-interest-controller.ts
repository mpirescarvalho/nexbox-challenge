import { Request, Response } from 'express';

import { IController } from '../../interfaces/controller';
import { IFindNearbyPointsOfInterest } from '../../../usecases/interfaces';

export class FindNearbyPOIsController implements IController {
	constructor(private readonly findNearbyPOIs: IFindNearbyPointsOfInterest) {}

	async handle(request: Request, response: Response) {
		try {
			const requiredParams = ['max_distance', 'x_coordinate', 'y_coordinate'];
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

			const { max_distance, x_coordinate, y_coordinate } = request.body;

			if (
				!Number.isInteger(x_coordinate) ||
				!Number.isInteger(y_coordinate) ||
				x_coordinate < 0 ||
				y_coordinate < 0 ||
				!Number.isInteger(max_distance) ||
				max_distance < 0
			) {
				return response.status(400).json({
					error:
						'Invalid coordinates. Both coordinates and the distance must be positive integers.',
				});
			}

			const nearbyPointsOfInterest = await this.findNearbyPOIs.execute({
				max_distance,
				x_coordinate,
				y_coordinate,
			});
			return response.status(200).json({ nearbyPointsOfInterest });
		} catch (error) {
			return response.status(500).send(error.stack);
		}
	}
}
