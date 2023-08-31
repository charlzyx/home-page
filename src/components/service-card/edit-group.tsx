import { Input, Modal, Spacer, useModal } from '@geist-ui/core';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import Link from '../link';

import { useEditServices } from 'src/hooks/use-edit-services';
import type { Service, ServiceGroup } from 'src/types/services';

export default function EditGroup(props: ServiceGroup) {
  const { isEdit, handleEditServiceGroup } = useEditServices();
  const { visible, setVisible } = useModal(false);

  const [group, setGroup] = useState<ServiceGroup & { oldGroupName: string }>({ ...props, oldGroupName: props.name });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: keyof Service) => {
    setGroup(s => ({ ...s, [key]: e.target.value }));
  };

  return (
    <>
      <div onClick={() => setVisible(true)} className={`i-carbon-edit transition-all ${isEdit ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />
      <Modal visible={visible} disableBackdropClick>
        <Modal.Title>编辑分组信息</Modal.Title>
        <Modal.Subtitle>所有选项都必填</Modal.Subtitle>
        <Modal.Content className="!mx-auto">
          <Input label="名称" value={group.name} onChange={e => handleChange(e, 'name')} />
          <Spacer />
          <Input label="图标" value={group.icon} onChange={e => handleChange(e, 'icon')} />
          <div className="text-center text-sm mt-2">
            Tip:
            <Link href="https://icones.js.org/collection/carbon" target="_blank">跳转到选择图标的页面</Link>
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>取消</Modal.Action>
        <Modal.Action onClick={() => {
          handleEditServiceGroup(group, false, () => setVisible(false));
        }}>提交</Modal.Action>
      </Modal>
    </>
  );
}
