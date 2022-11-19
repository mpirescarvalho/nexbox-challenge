import { PointOfInterestModel } from '../../../models';

export type SavePOIRepositoryParams = Omit<PointOfInterestModel, 'id'>;

export interface ISavePointOfInterestRepository {
	save(data: SavePOIRepositoryParams): Promise<PointOfInterestModel>;
}
