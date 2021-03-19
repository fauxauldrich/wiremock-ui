import { Request } from "./RequestModel";
import { Response } from "./ResponseModel";
export interface Mapping {
  priority?: number;
  id?: string;
  uuid?: string;
  request: Request;
  response: Response;
}
