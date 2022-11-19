import { PointOfInterestModel } from '../../../models';

export interface ILoadPointsOfInterestRepository {
	loadAll(): Promise<PointOfInterestModel[]>;
}
