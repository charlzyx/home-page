import useSWR from 'swr';

import { fetcher } from 'src/lib/fetcher';
// import type { MemoryInfoResponse, CpuInfoResponse, FullInfoResponse } from 'src/types/system';
import type { FullInfoResponse } from 'src/types/system';

// function CpuInfo() {
//   const { data, error } = useSWR<CpuInfoResponse>('/api/system/cpuinfo', fetcher, { refreshInterval: 1000 });
//   if (error) return null;

//   return (
//     <div className="flex items-center">
//       <div className="i-carbon:chip text-4 mr-3" />
//       <div>{data?.usage} Usage</div>
//     </div>
//   );
// }

// function MemInfo() {
//   const { data, error } = useSWR<MemoryInfoResponse>('/api/system/meminfo', fetcher, { refreshInterval: 1000 });
//   if (error) return null;

//   return (
//     <div className="flex items-center">
//       <div className="i-carbon:activy text-4 mr-3" />
//       <div>{data?.free} Free</div>
//     </div>
//   );
// }

const units = ['b', 'KB', 'MB', 'GB', 'TB'];
const readable = (x: number, toFixed = 2) => {
  let n = x;

  let uidx = 0;
  while (n > 1024) {
    n = n / 1024;
    uidx++;
  }
  return n.toFixed(toFixed) + units[uidx];
};

export default function SystemIno() {
  const { data, error } = useSWR<FullInfoResponse>('/api/system/all', fetcher, {
    refreshInterval: 6666
  });
  if (error || !data) return null;
  const { cpu, system, mem, fs } = data;

  return (
    <div className="children:mb-2">
      <div className="flex items-top">
        <div className="i-carbon:edge-node text-4 mr-3" />
        <div>
          {cpu.usage} {system.manufacturer}&reg; {cpu.manufacturer}&reg;
          {cpu.speed}GHz/{cpu.cores}Cores
        </div>
      </div>
      <div className="flex items-center">
        <div className="i-carbon:chip text-4 mr-3" />
        <div>
          {((mem.free / mem.total) * 100).toFixed(2)}% {readable(mem.free)}/
          {readable(mem.total)}
        </div>
      </div>

      <div className="flex items-top">
        <div className="i-carbon:data-base text-4 mr-3" />
        <div>
          {fs
            .filter((f) => /cloud|space/.test(f.mount))
            .map((f) => {
              return (
                <div key={f.mount}>
                  {f.use}% {f.mount} {readable(f.available, 1)}/
                  {readable(f.size, 1)}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
