import express, { Express, Router } from 'express';
import cors from 'cors';
import { historicalForex, currencyList, realTimeForex } from './controllers';
import { getServices } from './services';
import currenciesInfo from '../fiatCurrencies.json';

let configPath = { path: process.env.ENV_PATH };
if (!configPath.path) {
  configPath = undefined;
}
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(configPath);
} else if (!process.env.SCOOP_API_KEY) {
  throw Error('NEED SCOOP API KEY AS ENV VARIABLE!');
}

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

    const pathToStaticApp = require('path').resolve(
      __dirname, process.env.NODE_ENV === 'production'
        ? '../build'
        : '../../forex-dashboard/build',
    );
    console.log('path to static app:', pathToStaticApp);
    this.app
      .use(express.static(pathToStaticApp));
    // .get('/', async (req, res) => {
    //   res.sendFile(`${pathToStaticApp}/index.html`);
    // });
  }

  start() {
    this.app
      .use(cors())
      .listen(PORT, () => {
        console.log(`￼[server]: Server is running at http://localhost:${PORT}`);
      });
  }
}

Server.create()
  .then((app) => app.start());
