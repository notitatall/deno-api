import { GidService } from "./gid_service.ts";

export class GidServiceImpl implements GidService {
  private _gids: Set<string> = new Set();

  getNextGid = (): string => {
    const nextGid = this._incrementLastGid();

    this._gids.add(nextGid);

    return nextGid;
  };

  private _incrementLastGid = (): string => {
    const lastGidAsNumber = Number(this._gids.values().next().value);

    if (isNaN(lastGidAsNumber)) {
      throw Error("lastGid is not a number");
    }

    return `${lastGidAsNumber + 1}`;
  };
}
