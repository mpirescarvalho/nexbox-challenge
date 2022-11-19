export type Point = {
	x_coordinate: number;
	y_coordinate: number;
};

export interface IPointDistanceCalculator {
	calculate(a: Point, b: Point): number;
}

export class PointDistanceCalculator implements IPointDistanceCalculator {
	calculate(a: Point, b: Point): number {
		const deltaX = b.x_coordinate - a.x_coordinate;
		const deltaY = b.y_coordinate - a.y_coordinate;

		const deltaXSquared = deltaX * deltaX;
		const deltaYSquared = deltaY * deltaY;

		const distance = Math.sqrt(deltaXSquared + deltaYSquared);

		return distance;
	}
}
