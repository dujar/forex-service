import { Request, Response } from 'express';

export const currencyList = async (req: Request, res: Response) => {
  console.log('currency list');
  const { currenciesInfo } = req.app.locals;
  if (!Array.isArray(currenciesInfo) && currenciesInfo.length == 0) {
    res.sendStatus(500);
  } else {
    res.json(req.app.locals.currenciesInfo);
  }
};
