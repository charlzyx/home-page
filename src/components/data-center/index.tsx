import { Loading } from '@geist-ui/core';

import { useServices } from 'src/hooks/use-services';
import Footer from '../footer';
import Hitokoto from '../hitokoto';
import GroupCard from '../service-card/group';

import { getDate, getDay, getMonth, getYear } from 'date-fns';
import { fetcher } from 'src/lib/fetcher';
import useSWR from 'swr';

import type { Env } from 'src/types/env';

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

export default function DataCenter() {
  const { servicesData } = useServices();
  // docker 动态加载 env
  const { data } = useSWR<Env>('/api/env', fetcher);

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
      <div className="flex flex-col">
        {servicesData && servicesData.length !== 0 ? (
          <div>
            {servicesData.map((group) => <GroupCard {...group} key={group.name} />)}
          </div>
        )
          : <Loading />}
      </div>
      <Footer />
    </div>
  );
}
