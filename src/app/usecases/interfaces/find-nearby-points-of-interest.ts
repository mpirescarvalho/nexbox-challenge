import { PointOfInterestModel } from '../../models';

export type FindNearbyPointsOfInterestParams = {
	x_coordinate: number;
	y_coordinate: number;
	max_distance: number;
};

export interface IFindNearbyPointsOfInterest {
	execute(
		params: FindNearbyPointsOfInterestParams
	): Promise<PointOfInterestModel[]>;
}
