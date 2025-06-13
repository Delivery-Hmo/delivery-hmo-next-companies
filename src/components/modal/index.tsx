import React from "react";
import { Modal as ModalAnt, ModalProps } from "antd";

interface Props extends ModalProps {

}

const Modal = ({ ...props }: Props) => {
  return (
    <ModalAnt
      {...props}
    />
  );
};

export default Modal;