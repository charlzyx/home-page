import EditCard from './edit-card';

import { useEditServices } from 'src/hooks/use-edit-services';
import { useIcon } from 'src/hooks/use-icon';

import { useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Service } from 'src/types/services';
import { useServices } from 'src/hooks/use-services';

export const serviceNameUpperAtom = atomWithStorage<boolean>('home-page-service-name-upper', true);

export default function ServiceCard(props: Service) {
  const { isEdit, handleDeleteService, handleUpdateServices } = useEditServices();
  const isUpper = useAtomValue(serviceNameUpperAtom);
  const { servicesData, update } = useServices();

  const { name, description, icon, path } = props;

  const safeIcon = useIcon(icon);

  const topme = (srv: Service) => {
    const neo = servicesData?.filter(x => x.name !== srv.name);
    neo?.unshift(srv);
    handleUpdateServices(neo!).then(() => {
      update();
    });
  };

  return (
    <div className="m-2 flex">
      <div
        className="flex-1 p-3 rd-2 position-relative max-w-80 dark:bg-#1D1D1D bg-#E2E2E2"
      >
        <div onClick={() => topme(props)} className={`absolute top-1.5 right-2 i-carbon-upgrade transition-all ${isEdit ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />
        <div onClick={() => handleDeleteService(name)} className={`absolute top-1.5 left-2 i-carbon-trash-can transition-all ${isEdit ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />
        <EditCard {...props} />
        <a href={path} className="text-center opacity-animation-3 relative color-inherit">
          <div className="flex justify-start items-start">
            <div className={`i-carbon-${safeIcon} text-2xl mr-2`} />
            <p className="text-3.5 m-0">{isUpper ? name.toUpperCase() : name}</p>
          </div>
          <div className="flex justify-start items-start">
            <small className="mt-2 text-3 op-70 block">{description}</small>
          </div>
        </a>
      </div>
    </div>
  );
}
