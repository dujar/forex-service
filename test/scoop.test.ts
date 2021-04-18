import axios from 'axios';
import anyTest, { TestInterface } from 'ava';
import moment from 'moment';

import { parseStatus } from '../src/utils';

require('dotenv').config()

const test = anyTest as TestInterface;

const BASE_URI = "https://api.currencyscoop.com/v1";
const scoop = axios.create({
    baseURL: BASE_URI,
    params: {
        api_key: process.env.CURRENCY_SCOOP
    }
});


test('historical', async (t) => {
    const date = moment().subtract(1,'day').format('YYYY-MM-DD');
    let resp: any = await Promise.all([await scoop.get('/historical', {
        params: {
            base: 'USD',
            symbols: 'EUR',
            date
        }
    }),
    await scoop.get('/historical', {
        params: {
            base: 'USD',
            symbols: 'EUR,',
            date
        }
    }),
    await scoop.get('/historical', {
        params: {
            base: 'USD',
            symbols: 'EUR,ALL',
            date: moment().format('YYYY-MM-DD')
        }
    })])
    // response: { date: '2001-02-02', base: 'USD', rates: { EUR: 1.06904507 } };
    console.log(resp[0].data)
    console.log(resp[1].data)
    t.truthy(resp[0].data.response.rates.EUR)
    t.truthy(resp[2].data.response.rates.ALL)


    resp = await scoop.get('/historical', {
        params: {
            base: 'USD',
            symbols: 'EUR,THB',
            date: '2021-02-02'
        }
    });

    // response: {
    //     date: '2001-02-02',
    //     base: 'USD',
    //     rates: { EUR: 1.06904507, THB: 42.29999935 }
    //   }
    console.log(resp.data)
    t.truthy(resp.data.response)

})

test('latest', async (t) => {

    let resp = await scoop.get('/latest', {
        params: {
            base: 'USD',
            symbols: 'EUR',
        }
    });

    // {
    // meta: {
    //     code: 200,
    //     disclaimer: 'Usage subject to terms: https://currencyscoop.com/terms'
    //   },
    //   response: {
    //     date: '2021-04-16T05:46:23Z',
    //     base: 'USD',
    //     rates: { EUR: 0.84069428 }
    //   }
    // }
    console.log(resp.data)
    t.truthy(Object.keys(resp.data.response.rates).find(e=> e =='EUR'))

    resp = await scoop.get('/latest', {
        params: {
            base: 'USD',
            symbols: 'EUR,THB',
        }
    });

    // {
    // meta: {
    //     code: 200,
    //     disclaimer: 'Usage subject to terms: https://currencyscoop.com/terms'
    //   },
    //   response: {
    //     date: '2021-04-16T05:46:23Z',
    //     base: 'USD',
    //     rates: { EUR: 0.84069428 }
    //   }
    // }
    console.log(resp.data)
    t.truthy(Object.keys(resp.data.response.rates).find(e=> e =='THB'))

})

test('currencies', async (t) => {

    const resp = await scoop.get('/currencies', {
        params: {
            type: 'fiat',
        }
    });

    // require('fs').writeFileSync('currencies.json',JSON.stringify(resp.data.response.fiats))
    t.truthy(resp.data.response.fiats);

})

test("errors to provide eith utils fn", async (t) => {

    let resp = await scoop.get('/loop', {
        params: {
            tulip: 'choco',
        }
    }).catch(e => e.response)
    console.log("data: ", resp.data)
    console.log("status is: ", resp.status)

    // t.deepEqual(resp.status, parseStatus(resp, { sendStatus: (e: any) => e } as any));


    // unauthenticated
    resp = await axios.get(BASE_URI + '/list', {
        params: {
            tulip: 'choco',
        }
    }).catch(e => e.response);

    console.log('resp is:', resp)
    console.log("data: ", resp.data)
    console.log("status is: ", resp.status)

    t.deepEqual(resp.status, parseStatus(resp, { sendStatus: (e: any) => e } as any));


    resp = await axios.get(BASE_URI + '/list', {
        params: {
            tulip: 'choco',
        }
    }).catch(e => e.response);

    console.log("data: ", resp.data)
    console.log("status is: ", resp.status)

    t.deepEqual(resp.status, parseStatus(resp, { sendStatus: (e: any) => e } as any));
})


