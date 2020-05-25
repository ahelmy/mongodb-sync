import MongoClient from 'mongodb';
import config from 'config';

const DB_URL = process.env.DB_URL;

export default class Main {
    constructor() {
    }
    main() {
        MongoClient.connect(DB_URL).then(client => {
            console.log('Connected to DB');

            const db = client.db('mydb');
            const collection = db.collection('Stocks');

            const changeStream = collection.watch();
            
            changeStream.on('change', event => {
                let document = event.fullDocument ? JSON.stringify(event.fullDocument) : event.documentKey;
                console.log(`Operation: ${event.operationType}, Document: ${document}`)
            });
            console.log('Watching...');
        }).catch(err => {
            console.error(err);
        });
    }

}

export function main() {
    new Main().main();
}
