import { AxiosResponse } from 'axios';
import { Response } from 'express';
import { ScoopErrors } from '../interfaces';

export const parseStatus = (resp: AxiosResponse, response: Response): false | any => {
  switch (`${resp.status}`) {
    case ScoopErrors.UNAUTHORIZED: {
      console.log('error: ', ScoopErrors.UNAUTHORIZED);
      response.sendStatus(Number(ScoopErrors.INTERNAL_SERVER_ERROR));
      return false;
    }
    case ScoopErrors.INTERNAL_SERVER_ERROR: {
      console.log('error: ', ScoopErrors.INTERNAL_SERVER_ERROR);
      response.sendStatus(Number(ScoopErrors.INTERNAL_SERVER_ERROR));
      return false;
    }
    case ScoopErrors.SERVICE_UNAVAILABLE: {
      console.log('error: ', ScoopErrors.SERVICE_UNAVAILABLE);
      response.sendStatus(Number(ScoopErrors.INTERNAL_SERVER_ERROR));
      return false;
    }
    case ScoopErrors.SUCCESS: {
      if (resp.data) {
        return resp.data;
      }
      console.log('success but no data to display: ', ScoopErrors.SUCCESS);
      response.sendStatus(Number(ScoopErrors.INTERNAL_SERVER_ERROR));
      return false;
    }
    case ScoopErrors.UNPROCESSABLE: {
      console.log('error: ', ScoopErrors.UNPROCESSABLE);
      response.sendStatus(Number(ScoopErrors.UNPROCESSABLE));
      return false;
    }
    default:
      console.log('undocumented status', resp.status);
      response.sendStatus(500);
      return false;
  }
};
