import express, { Express, Router } from 'express';

import bodyParser from 'body-parser';
import { historicalForex, currencyList, realTimeForex } from './controllers';
import { getServices } from './services';
import currenciesInfo from '../fiatCurrencies.json';

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
    server.bootstrap();
    return server;
  }

  bootstrap() {
    const currenciesSymbol = Object.keys(currenciesInfo);
    this.app.locals = {
      services: getServices(),
      currenciesSymbol,
      currenciesInfo,
    };
    const v1Router = Router();
    v1Router.get('/currencies', currencyList);
    v1Router.get('/forex', realTimeForex);
    v1Router.get('/latest', historicalForex);
    this.app
      .use('/v1', v1Router);
  }

  start() {
    this.app
      .use((req, res, next) => {
        // res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      })
      .listen(PORT, () => {
        console.log(`￼[server]: Server is running at https://localhost:${PORT}`);
      });
  }
}

Server.create()
  .then((app) => app.start());
