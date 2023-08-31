import fs from 'fs/promises';
import path from 'path';

import type { Service, ServiceGroup } from 'src/types/services';

const filePath = process.env.FILE_PATH || `${path.resolve()}/services.json`;

export const getServicesData = async () => {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(data) as ServiceGroup[];
  } catch {
    throw new Error('获取 services data 错误');
  }
};

export const addServiceGroup = async (group: Partial<ServiceGroup>) => {
  const servicesData = await getServicesData();
  group.services = group.services ?? [];
  servicesData.push(group as ServiceGroup);
  await fs.writeFile(filePath, JSON.stringify(servicesData, null, 2));
};

export const deleteServiceGroup = async (groupName: string) => {
  const servicesData = await getServicesData();
  const newData = servicesData.filter(item => item.name === groupName);
  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};

export const editServiceGroup = async (group: ServiceGroup & { oldGroupName: string }) => {
  const servicesData = await getServicesData();
  const newData = servicesData.map(item => (item.name === group.oldGroupName ? group : item));
  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};

export const addServicesData = async (service: Service & { groupName: string }) => {
  const servicesData = await getServicesData();
  const newData = servicesData.map(group => {
    if (service.groupName === group.name)
      group.services.push(service);
    return group;
  });

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};

export const deleteServicesData = async (target: string, groupName: string) => {
  const servicesData = await getServicesData();
  const newData = servicesData.map(group => {
    if (groupName === group.name)
      group.services = group.services.filter(service => service.name !== target);

    return group;
  });

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};

export const editServiceData = async (service: Service & { oldName: string; groupName: string }) => {
  const servicesData = await getServicesData();
  const newData = servicesData.map(group => {
    if (service.groupName === group.name) {
      group.services = group.services.map(item => {
        return item.name === service.oldName ? service : item;
      });
    }

    return group;
  });

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};

export const updateServiceData = async (services: ServiceGroup[]) => {
  await fs.writeFile(filePath, JSON.stringify(services, null, 2));
};
