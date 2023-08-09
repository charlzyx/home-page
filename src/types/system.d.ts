export interface CpuInfoResponse {
  usage: string
}

export interface MemoryInfoResponse {
  free: number
}
export type FullInfoResponse = typeof example;

const example = {
  cpu: {
    manufacturer: 'Intel',
    brand: 'Celeron® J6412',
    vendor: '',
    family: '',
    model: '',
    stepping: '',
    revision: '',
    voltage: '',
    speed: 2,
    speedMin: null,
    speedMax: null,
    governor: 'performance',
    cores: 4,
    physicalCores: 4,
    performanceCores: 4,
    efficiencyCores: 0,
    processors: 1,
    socket: '',
    flags: '',
    usage: '12%',
    virtualization: false,
    cache: {
      l1d: '',
      l1i: '',
      l2: '',
      l3: ''
    }
  },
  system: {
    manufacturer: 'Maxtang',
    model: 'Docker Container',
    version: 'V1.0',
    serial: '-',
    uuid: '',
    sku: '-',
    virtual: false
  },
  mem: {
    total: 8155770880,
    free: 715022336,
    used: 7440748544,
    active: 3061137408,
    available: 5094633472,
    buffers: 371314688,
    cached: 4002168832,
    slab: 536211456,
    buffcache: 4909694976,
    swaptotal: 8153722880,
    swapused: 7340032,
    swapfree: 8146382848
  },
  os: {
    platform: 'linux',
    distro: 'Alpine Linux',
    release: '3.18.2',
    codename: '',
    kernel: '6.2.16-3-pve',
    arch: 'x64',
    hostname: '796d7f91bee2',
    fqdn: '796d7f91bee2',
    codepage: 'UTF-8',
    logofile: 'alpine-linux',
    serial: '',
    build: '',
    servicepack: '',
    uefi: false
  },
  disk: [],
  dev: [],
  fs: [
    {
      fs: 'overlay',
      type: 'overlay',
      size: 72829001728,
      used: 10104762368,
      available: 58977890304,
      use: 14.63,
      mount: '/',
      rw: false
    },
    {
      fs: '/dev/mapper/pve-root',
      type: 'ext4',
      size: 72829001728,
      used: 10104762368,
      available: 58977890304,
      use: 14.63,
      mount: '/titan',
      rw: true
    },
    {
      fs: '/dev/sdb2',
      type: 'ext4',
      size: 3148779962368,
      used: 92253528064,
      available: 2896500682752,
      use: 3.09,
      mount: '/titan/cloud',
      rw: true
    },
    {
      fs: '/dev/sdb1',
      type: 'ext4',
      size: 12698656759808,
      used: 689715339264,
      available: 11368888692736,
      use: 5.72,
      mount: '/titan/space',
      rw: true
    }
  ],
  network: [
    {
      iface: 'lo',
      ifaceName: 'lo',
      default: false,
      ip4: '127.0.0.1',
      ip4subnet: '255.0.0.0',
      ip6: '',
      ip6subnet: '',
      mac: '00:00:00:00:00:00',
      internal: true,
      virtual: false,
      operstate: 'unknown',
      type: 'virtual',
      duplex: '',
      mtu: 65536,
      speed: null,
      dhcp: false,
      dnsSuffix: 'Unknown',
      ieee8021xAuth: 'Not defined',
      ieee8021xState: 'Disabled',
      carrierChanges: 0
    },
    {
      iface: 'eth0',
      ifaceName: 'eth0',
      default: true,
      ip4: '172.19.0.2',
      ip4subnet: '255.255.0.0',
      ip6: '',
      ip6subnet: '',
      mac: '02:42:ac:13:00:02',
      internal: false,
      virtual: false,
      operstate: 'up',
      type: 'wired',
      duplex: 'full',
      mtu: 1500,
      speed: 10000,
      dhcp: false,
      dnsSuffix: 'Unknown',
      ieee8021xAuth: 'Not defined',
      ieee8021xState: 'Disabled',
      carrierChanges: 2
    }
  ],
  docker: {}

} as const;
