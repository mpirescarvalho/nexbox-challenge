import { Router } from 'express';
import {
	LoadPOIsControllerFactory,
	FindNearbyPOIsControllerFactory,
	CreatePOIControllerFactory,
} from './app/factories/controllers';

const router = Router();

router.get('/pois', (req, res) => LoadPOIsControllerFactory().handle(req, res));

router.post('/pois/nearby', (req, res) =>
	FindNearbyPOIsControllerFactory().handle(req, res)
);

router.post('/pois', (req, res) =>
	CreatePOIControllerFactory().handle(req, res)
);

export { router };
