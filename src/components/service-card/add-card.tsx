import { Input, Modal, Spacer, useModal } from '@geist-ui/core';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import Link from '../link';
import { useEditServices } from 'src/hooks/use-edit-services';
import type { Service } from 'src/types/services';

export default function AddService(props: { groupName: string }) {
  const { isEdit, handleAddService: handlerAddService } = useEditServices();
  const { setVisible, visible } = useModal(false);

  const [service, setService] = useState<Service & { groupName: string }>({
    name: '',
    description: '',
    path: '',
    icon: '',
    groupName: props.groupName
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: keyof Service) => {
    setService(s => ({ ...s, [key]: e.target.value }));
  };

  return (
    <>
      <div onClick={() => setVisible(true)} className={`${isEdit ? 'visible op-100' : 'invisible op-0'} transition-all i-carbon-task-add  cursor-pointer opacity-animation-3`} />
      <Modal visible={visible} disableBackdropClick>
        <Modal.Title>添加卡片到「{props.groupName}」</Modal.Title>
        <Modal.Subtitle>所有选项都必填</Modal.Subtitle>
        <Modal.Content className="!mx-auto">
          <Input label="名称" onChange={e => handleChange(e, 'name')} />
          <Spacer />
          <Input label="描述" onChange={e => handleChange(e, 'description')} />
          <Spacer />
          <Input label="路径" onChange={e => handleChange(e, 'path')} />
          <Spacer />
          <Input label="图标" onChange={e => handleChange(e, 'icon')} />
          <div className="text-center text-sm mt-2">
            Tip:
            <Link href="https://icones.js.org/collection/carbon" target="_blank">跳转到选择图标的页面</Link>
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>取消</Modal.Action>
        <Modal.Action onClick={() => {
          handlerAddService(service, () => setVisible(false));
        }}>提交</Modal.Action>
      </Modal>
    </>
  );
}
