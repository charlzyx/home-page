import * as si from 'systeminformation';

import { generatorRespError } from 'src/utils/handler';
import type { Handler } from 'src/types/next-handler';

const handler: Handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json(generatorRespError(`method ${req.method ?? ''} not supported`));
    return;
  }

  switch (req.query.type) {
    case 'cpuinfo':
      res.status(200).json({ usage: `${(await si.currentLoad()).currentLoad.toFixed(2)}%` });
      break;
    case 'meminfo':
      res.status(200).json({ free: `${((await si.mem()).free / (1024 ** 3)).toFixed(2)} GB` });
      break;
    default:
      res.status(400).json(generatorRespError('unknown type'));
  }
};

export default handler;
