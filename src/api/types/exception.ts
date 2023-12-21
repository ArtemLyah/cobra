import { HttpStatusCode } from 'axios';

export interface ServerException {
  error: string;
  status: HttpStatusCode;
  message: string;
}