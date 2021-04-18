import axios, { AxiosInstance } from 'axios';
import { Response } from 'express';
import moment from 'moment';
import { parseStatus } from '../utils';

export class CurrencyScoop {
  private client: AxiosInstance;

  private caching: any = {}

  constructor(conf: { baseURI: string, token: string }) {
    this.client = axios.create({
      baseURL: conf.baseURI,
      params: {
        api_key: conf.token,
      },
    });
  }

  getTodaysRate = async (base: string, symbols: string[]) => this.client.get('/latest', {
    params: {
      base,
      symbols: symbols.join(','),
    },
  })
    .catch((e) => {
      if (e && e.response) {
        return e.response;
      }
      return { status: 400 };
    })

  getLatest = async (base: string, symbols: string[], response: Response) => {
    const resp = await this.getTodaysRate(base, symbols);
    const data = parseStatus(resp, response);
    if (!data) {
      return false;
    }
    return data.response;
  }

  getLatestRatesFromXdays = async (base: string, symbols: string[], span, response: Response) => {
    try {
      const today = moment().format('YYYY-MM-DD');
      if (this.caching[today] && this.caching[today][base]) {
        return this.caching[today][base];
      }
      const resp = await Promise.all([...new Array(Number(span))].map(async (e, i) => {
        let date = moment().subtract(i, 'day').format('YYYY-MM-DD');
        let resp;
        if (i === 0) {
          date = moment().format('YYYY-MM-DD');
          resp = await this.getTodaysRate(base, symbols);
          if (resp) {
            resp = resp.data.response;
            resp.date = today;
          }
        } else {
          resp = await this.getHistoricalRates(
            base,
            symbols,
            date,
          );
        }
        return resp;
      }));

      if (resp && resp.filter((e) => e).length === Number(span)) {
        const parsedData = resp.reduce((a, b) => {
          a[b.date] = b.rates;
          return a;
        }, { base, today, span });
        console.log('parsed data', parsedData);
        this.caching[today] = {};
        this.caching[today][base] = parsedData;
        return parsedData;
      }
      console.log('error getting historical rates span:', span, resp);
      response.sendStatus(500);
      return false;
    } catch (e) {
      console.log('error getting historical by span', e);
      return false;
    }
  }

  getHistoricalRates = async (base: string, symbols: string[], date) => this.client.get('/historical', {
    params: {
      base,
      symbols: symbols.join(','),
      date,
    },
  })
    .then((e) => e.data.response)
    .catch((e) => {
      if (e && e.response) {
        return e.response;
      }
      return { status: 400 };
    })
}
