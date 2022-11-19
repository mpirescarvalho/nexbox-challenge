import { PointOfInterestModel } from '../../models';

export interface ILoadPointsOfInterest {
	execute(): Promise<PointOfInterestModel[]>;
}
