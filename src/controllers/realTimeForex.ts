import { Request, Response } from 'express';

export const realTimeForex = async (req: Request, res: Response) => {
  console.log('realTimeForex');
  const { services, currenciesSymbol } = req.app.locals;
  const { base } = req.query;
  if (!currenciesSymbol.find((e) => e === base)) {
    res.sendStatus(400);
    return;
  }
  const latest = await services.scoop.getLatest(base, currenciesSymbol, res);
  if (latest) {
    res.send(latest);
  }
};
