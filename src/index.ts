import * as express from 'express';
import { Express, Router } from 'express';
import * as bodyParser from 'body-parser';
import { historicalForex, currencyList, realTimeForex } from './controllers';

let configPath = { path: process.env.ENV_PATH };
if (!configPath.path) {
    configPath = undefined;
}
require('dotenv').config(configPath);

const PORT = process.env.PORT || 8080;
class Server {
    constructor(private app: Express) { }

    static async create() {
        const app = express();

        const server = new Server(app);

        server.bootstrap()
        return server;
    }

    bootstrap() {
        const v1Router = Router();
        v1Router.get('/currencies', currencyList)
        v1Router.get('/forex', realTimeForex)
        v1Router.get('/historical', historicalForex)
        this.app.use('/v1',v1Router)
    }

    start() {

        this.app
            .listen(PORT, () => {
                console.log(`￼[server]: Server is running at https://localhost:${PORT}`);
            });
    }
}

Server.create()
    .then((app) => app.start());
