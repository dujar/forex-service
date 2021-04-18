import { CurrencyScoop } from './currencyScoop';

export const getServices = (conf?) => ({
  scoop: new CurrencyScoop(conf && conf.scoop ? conf.scoop : { baseURI: 'https://api.currencyscoop.com/v1', token: process.env.SCOOP_API_KEY }),
});
