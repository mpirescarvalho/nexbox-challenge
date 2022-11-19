import { app } from './app';
import { createConnection } from './database';

const PORT = process.env.PORT || 3334;

createConnection()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server listening at http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Database connection failed', error);
	});
