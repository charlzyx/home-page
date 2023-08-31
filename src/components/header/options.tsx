import { Input, Modal, Spacer, useModal } from '@geist-ui/core';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { useEditServices } from 'src/hooks/use-edit-services';
import type { ServiceGroup } from 'src/types/services';
import Link from '../link';

export default function Options() {
  const { isEdit, handleAddServiceGroup, toggleEditMode } = useEditServices();
  const { setVisible, visible } = useModal(false);

  const [group, setGroup] = useState<ServiceGroup>({
    name: '',
    icon: '',
    zip: true,
    services: []
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: keyof ServiceGroup) => {
    setGroup(s => ({ ...s, [key]: e.target.value }));
  };

  return (
    <>
      <div onClick={() => setVisible(true)} className={`${isEdit ? 'visible op-100' : 'invisible op-0'} transition-all i-carbon-bookmark-add text-5 mr-3 cursor-pointer opacity-animation-3`} />
      <div onClick={() => toggleEditMode()} className={`${isEdit ? 'i-carbon-edit-off' : 'i-carbon-edit'} text-5 cursor-pointer icon-tap-color mr-3 opacity-animation-3 `} />
      <Modal visible={visible} disableBackdropClick>
        <Modal.Title>添加分组</Modal.Title>
        <Modal.Subtitle>所有选项都必填</Modal.Subtitle>
        <Modal.Content className="!mx-auto">
          <Input label="名称" onChange={e => handleChange(e, 'name')} />
          <Spacer />
          <Input label="图标" onChange={e => handleChange(e, 'icon')} />
          <div className="text-center text-sm mt-2">
            Tip:
            <Link href="https://icones.js.org/collection/carbon" target="_blank">跳转到选择图标的页面</Link>
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>取消</Modal.Action>
        <Modal.Action onClick={() => {
          handleAddServiceGroup(group, () => setVisible(false));
        }}>提交</Modal.Action>
      </Modal>
    </>
  );
}
