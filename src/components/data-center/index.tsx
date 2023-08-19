import { Loading } from '@geist-ui/core';

import Footer from '../footer';
import Hitokoto from '../hitokoto';
import ServiceCard from '../service-card';
import { SortableContainer, arrayMove, SortableElement } from 'react-sortable-hoc';
import { useServices } from 'src/hooks/use-services';
import { useState, useEffect, useRef, useMemo } from 'react';

import useSWR from 'swr';
import { fetcher } from 'src/lib/fetcher';
import { getYear, getMonth, getDate, getDay } from 'date-fns';

import type { Env } from 'src/types/env';
import { useEditServices } from 'src/hooks/use-edit-services';

function DateTag() {

  const day = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  } as const;
  const date = new Date();

  const dateText = `${getYear(date)} 年 ${getMonth(date) + 1} 月 ${getDate(date)} 日 ${day[getDay(date)]}`;

  return (
    <p className="op-60 my-1 text-3">{dateText}</p>
  );
}

const SortableBox: any = SortableContainer((props:any) => {
  return <section className="mt-5 p-4 w-full rd-2 dark:bg-dark-box-background bg-box-background">{props.children}</section>;
});

const SortableCard = SortableElement((props: React.ComponentProps<typeof ServiceCard>) => {
  return <ServiceCard {...props} />;
});

export default function DataCenter() {
  const { servicesData, update } = useServices();
  const { isEdit, handleUpdateServices } = useEditServices();
  // docker 动态加载 env
  const { data } = useSWR<Env>('/api/env', fetcher);
  const [services, setServices] = useState(servicesData || []);
  const updating = useRef(false);

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    const neo = arrayMove(services, oldIndex, newIndex);
    setServices(neo);
    updating.current = true;
    handleUpdateServices(neo).then(update).finally(() => {
      setTimeout(() => {
        updating.current = false;
      }, 300);
    });
  };

  useEffect(() => {
    if (updating.current || !servicesData || servicesData.length === 0) return;
    if (JSON.stringify(services) !== JSON.stringify(servicesData))
      setServices(servicesData);
  }, [handleUpdateServices, services, servicesData]);

  const Card = useMemo(() => {
    return isEdit ? SortableCard : ServiceCard;
  }, [isEdit]);

  return (
    <div className="min-h-100vh pt-70px px-4 max-w-5xl mx-auto relative pb-70">
      <div className="flex justify-between items-center min-h-14">
        <div>
          <h3 className="mb-0 font-bold">{data?.title}</h3>
          <DateTag />
        </div>
        <div className="text-right text-0.9rem lt-md:w-50% mt-1">
          <Hitokoto />
        </div>
      </div>
      <SortableBox
        distance={1}
        axis="xy"
        onSortEnd={onSortEnd}>
        {
          (servicesData && servicesData.length !== 0)
            ? (
              <div className="grid grid-cols-4 lt-md:grid-cols-2 ">
                {services.map((service, index) => <Card index={index} {...service} key={service.name} />)}
              </div>
            )
            : (
              <Loading />
            )
        }
      </SortableBox>
      {/* <section className="mt-5 p-4 w-full rd-2 dark:bg-dark-box-background bg-box-background">
        {
          (servicesData && servicesData.length !== 0)
            ? (
              <div className="grid grid-cols-4 lt-md:grid-cols-2 ">
                {servicesData.map(service => <ServiceCard {...service} key={service.name} />)}
              </div>
            )
            : (
              <Loading />
            )
        }
      </section> */}
      <Footer />
    </div>
  );
}
