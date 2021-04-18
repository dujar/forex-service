
#FOREX SERVICE -MINIMALIST
-------------

Can view different fiat currencies prices.
You will be able to access in localhost:8080 or localhost:3000 (which would need CORS from chrome extension)


## STEPS TO RUN IT

- create a project directory where you will clone 2 repos
    - clone this repo (backend )
    - clone repo https://github.com/dujar/forex-dashboard (front end)
- build front end with following command

```
    yarn
    yarn build
```
- you need to add your own SCOOP_API_KEY in this repo .env file, I did not use the time series as I was not able to find response shape, hence I am only using the free QUERIES.
- 2 ways to run it either separately
    - 1: in root level of this repo run:
    ```
    yarn 
    yarn build
    yarn start
    ```
    you may then access ui at localhost:8080
    - 2: run first step and then run front end and access UI in localhost:3000 (would need CORS enabled)


## AREAS OF IMPROVEMENT
- error handling in both front end and backend
- better UI
- improved backend caching
- better structure in front end (right now it's poc style)
- better deployment for production (currently not in container)