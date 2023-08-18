import * as si from 'systeminformation';

import { generatorRespError } from 'src/utils/handler';
import type { Handler } from 'src/types/next-handler';

const handler: Handler = async (req, res) => {
  if (req.method !== 'GET') {
    res
      .status(405)
      .json(generatorRespError(`method ${req.method ?? ''} not supported`));
    return;
  }
  const usage = `${(await si.currentLoad()).currentLoad.toFixed(2)}%`;
  const cpu = await si.cpu();
  const system = await si.system();
  const mem = await si.mem();
  const os = await si.osInfo();
  const disk = await si.diskLayout();
  const dev = await si.blockDevices();
  const fs = await si.fsSize();
  const network = await si.networkInterfaces();
  const docker = await si.dockerInfo();
  res.status(200).json({
    cpu: {
      ...cpu, usage
    },
    system,
    mem,
    os, disk, dev, fs, network, docker,
  });

};

export default handler;
