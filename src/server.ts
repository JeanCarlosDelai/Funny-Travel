import dotenv from 'dotenv';
import app from './app';
import { sequelize } from './db/db';

dotenv.config();

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await sequelize.sync(); // Sincroniza os modelos com o banco de dados

        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();






