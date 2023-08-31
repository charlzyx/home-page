import { Loading, Spacer } from '@geist-ui/core';
import EditGroup from './edit-group';

import { useMemo, useRef, useState } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useEditServices } from 'src/hooks/use-edit-services';
import { useIcon } from 'src/hooks/use-icon';
import ServiceAdd from './add-card';
import ServiceCard from './index';

import { useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { ServiceGroup } from 'src/types/services';
import { useServices } from 'src/hooks/use-services';

export const serviceNameUpperAtom = atomWithStorage<boolean>('home-page-service-name-upper', true);

export default function GroupCard(props: ServiceGroup) {
  const { isEdit, handleDeleteServiceGroup, handleUpdateServices, handleEditServiceGroup } = useEditServices();
  const { update, servicesData } = useServices();
  const isUpper = useAtomValue(serviceNameUpperAtom);
  const [services, setServices] = useState(props.services || []);

  const { name, icon } = props;
  const updating = useRef(false);

  const safeIcon = useIcon(icon);

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    const services = props.services;
    const neo = arrayMove(services, oldIndex, newIndex);
    setServices(neo);

    updating.current = true;
    handleEditServiceGroup({
      ...props, services: neo,
      oldGroupName: props.name
    }, true).then(update).finally(() => {
      setTimeout(() => {
        updating.current = false;
      }, 300);
    });
  };
  const move = (to: 'up' | 'down') => {
    if (!servicesData) return;
    const current = servicesData.findIndex(x => x.name === props.name);
    if (!current) return;
    const next = to === 'up' ? Math.max(current - 1, 0) : Math.min(current + 1, servicesData.length);
    const neoData = arrayMove(servicesData, current, next);
    handleUpdateServices(neoData);
  };

  const SortableBox: any = useMemo(() => SortableContainer((props:any) => {
    return <section className="mt-0 p-2 w-full rd-2">{props.children}</section>;
  }), []);

  const SortableCard = useMemo(() => SortableElement((props: React.ComponentProps<typeof ServiceCard>) => {
    return <ServiceCard {...props} />;
  }), []);

  const Card = useMemo(() => {
    return isEdit ? SortableCard : ServiceCard;
  }, [SortableCard, isEdit]);
  return (
    <div>
      <div className="flex flex-row justify-between align-center">
        <div className="flex justify-start items-center">
          <div className={`i-carbon-${safeIcon} text-xl mr-2 `} />
          <p className="position-relative ml-2 link text-4 ">{isUpper ? name.toUpperCase() : name}</p>
        </div>
        <div className="flex flex-1  text-4.5 justify-end items-center mr-8 ">
          <ServiceAdd groupName={props.name} />
          <Spacer />
          <EditGroup {...props} />
          <Spacer />
          <div onClick={() => handleDeleteServiceGroup(name)} className={`i-carbon-trash-can transition-all ${isEdit ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />
          <Spacer />
          <div onClick={() => move('up')} className={`i-carbon-arrow-up transition-all ${isEdit ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />
          <Spacer />
          <div onClick={() => move('down')} className={`i-carbon-arrow-down transition-all ${isEdit ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />

        </div>
      </div>
      <div
        className="p-0 m-0">
        <SortableBox
          distance={1}
          axis="xy"
          onSortEnd={onSortEnd}
        >
          {
            (services.length !== 0)
              ? (
                <div className="grid grid-cols-4 lt-md:grid-cols-2 ">
                  {services.map((service, index) => <Card groupName={props.name} index={index} {...service} key={service.name} />)}
                </div>
              )
              : (
                <Loading />
              )
          }
        </SortableBox>
      </div>
    </div>
  );
}
