import axios from 'axios';
import anyTest, { TestInterface } from 'ava';

require('dotenv').config()

const test = anyTest as TestInterface;



test("check latest", async (t)=>{
    const resp = await axios.get('http://localhost:8080/v1/latest',{params:{base:'USD',span:7}})
    t.truthy(resp.data)
})

test("check latest without span", async (t)=>{
    const resp = await axios.get('http://localhost:8080/v1/latest',{params:{base:'USD'}}).catch(e=>{

        t.truthy("error")
    });
})

test("check latest without correct base", async (t)=>{
    const resp = await axios.get('http://localhost:8080/v1/latest',{params:{base:'USSSD'}}).catch(e=>{

        t.truthy("error")
    });
})

test("check latest without correct base uppercase", async (t)=>{
    const resp = await axios.get('http://localhost:8080/v1/latest',{params:{base:'usd'}}).catch(e=>{

        t.truthy("error")
    });
})

test("get all currencies", async (t)=>{
    const resp = await axios.get('http://localhost:8080/v1/currencies')//,{params:{base:'USD'}});
    t.truthy(resp.data)
})
test("get all currencies to match scoop currencies", async (t)=>{
    require('dotenv').config()
    const resp = await axios.get('http://localhost:8080/v1/currencies',{params:{base:'USD'}});
    const scoopCurrencies =  await axios.get('https://api.currencyscoop.com/v1/currencies', {
                params: {
                    type: 'fiat',
                    api_key: process.env.SCOOP_API_KEY
                }
            });
    const currencies = scoopCurrencies.data.response.fiats;

    t.truthy(resp.data['USD'].currency_name == currencies['USD'].currency_name)
})
test("get all currencies to match file", async (t)=>{
    const resp = await axios.get('http://localhost:8080/v1/currencies',{params:{base:'USD'}});

    const c = require('../fiatCurrencies.json');
   
    t.truthy(resp.data['USD'].currency_name == c['USD'].currency_name)
})
