import { PointOfInterestModel } from '../../models';

export type SavePointOfInterestParams = Omit<PointOfInterestModel, 'id'>;

export interface ISavePointOfInterest {
	execute(data: SavePointOfInterestParams): Promise<PointOfInterestModel>;
}
