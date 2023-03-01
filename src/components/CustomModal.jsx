import { Modal } from 'antd';
import React from 'react';

const CustomModal = ({open, title, handleOk, handleCancel, user, children}) => {
  console.log({user})
    return (
        <Modal
              open={open}
              title={title}
              onOk={handleOk}
              onCancel={handleCancel}
            >
             {children}
            </Modal>
    );
};

export default CustomModal;