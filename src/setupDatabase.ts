import mongoose from 'mongoose';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
    const connect = () => {
        mongoose.set('strictQuery', false);
        mongoose.connect(`${config.DATABASE_URL}`)
            .then(() => {
                log.info('Successfully connected to DB');
            })
            .catch((err) => {
                log.error('Error connecting to DB', err);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on('Disconnected', connect);
};
