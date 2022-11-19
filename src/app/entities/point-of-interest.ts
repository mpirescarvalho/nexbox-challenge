import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
} from 'typeorm';

@Entity()
export class PointOfInterest {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	x_coordinate: number;

	@Column()
	y_coordinate: number;

	@CreateDateColumn()
	created_at: Date;

	constructor(data: Omit<PointOfInterest, 'id' | 'created_at'>) {
		Object.assign(this, data);
	}
}
