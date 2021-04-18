import { Request, Response } from 'express';

export const historicalForex = async (req: Request, res: Response) => {
  console.log('historical forex');

  const { base, span } = req.query;

  if (!span || !base || Number(span) > 7) {
    res.sendStatus(400);
    return;
  }
  if (!Number(span)) {
    res.sendStatus(400);
    return;
  }
  const { currenciesSymbol, services } = req.app.locals;
  if (!currenciesSymbol.find((e) => e === base)) {
    res.sendStatus(400);
    return;
  }

  const resp = await services.scoop.getLatestRatesFromXdays(base, currenciesSymbol, span, res);
  if (resp) {
    res.json(resp);
  }
};
