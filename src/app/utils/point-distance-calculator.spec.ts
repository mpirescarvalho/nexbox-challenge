import { PointDistanceCalculator, Point } from './point-distance-calculator';

function trunc(n: number) {
	return n.toString().slice(0, 4);
}

describe('PointDistanceCalculator util', () => {
	it('Should give the correct distances', async () => {
		const calculator = new PointDistanceCalculator();

		const Point1: Point = { x_coordinate: 1, y_coordinate: 2 };
		const Point2: Point = { x_coordinate: 3, y_coordinate: 5 };
		const Point3: Point = { x_coordinate: 10, y_coordinate: 2 };
		const Point4: Point = { x_coordinate: 0, y_coordinate: 0 };
		const Point5: Point = { x_coordinate: 12, y_coordinate: 20 };
		const Point6: Point = { x_coordinate: 1, y_coordinate: 0 };
		const Point7: Point = { x_coordinate: 40, y_coordinate: 2 };
		const Point8: Point = { x_coordinate: 20, y_coordinate: 20 };
		const Point9: Point = { x_coordinate: 1.2, y_coordinate: 4.6 };

		expect(trunc(calculator.calculate(Point1, Point2))).toBe('3.60');
		expect(trunc(calculator.calculate(Point1, Point3))).toBe('9');
		expect(trunc(calculator.calculate(Point1, Point4))).toBe('2.23');
		expect(trunc(calculator.calculate(Point4, Point6))).toBe('1');
		expect(trunc(calculator.calculate(Point5, Point9))).toBe('18.8');
		expect(trunc(calculator.calculate(Point7, Point8))).toBe('26.9');
	});
});
