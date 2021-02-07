import styled from "styled-components";
import { ConfirmButton, CancelButton } from "./ButtonStyles";
import { createModal, useClickOutside } from "../lib/util";
import { handleKeyDown } from "../lib/handlers";
import { useRef } from "react";
import ReactDOM from "react-dom";

const ModalOuter = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 55;
  overflow: auto;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalInner = styled.div`
  border-radius: 3px;
  border-style: none;
  outline: none;
  background-color: white;
  width: 75vw;
  margin-top: 30px;
  overflow-y: auto;
`;

const Heading = styled.h3`
  font-size: 1.4rem;
  padding: 10px;
  padding-left: 25px;
  font-weight: 400;
`;

const Description = styled.p`
  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  outline: none;

  font-size: 1.3rem;
  opacity: 0.8;
  transition: 0.2s;
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;

  color: white;

  &:hover {
    opacity: 1;
  }
`;

const Modal = ({ name, message, onConfirm, onCancel, input }) => {
  const modalId = "modal-root";
  createModal(modalId);

  const modalRef = useRef();
  useClickOutside(modalRef, onCancel);

  return ReactDOM.createPortal(
    <ModalOuter>
      <ModalInner ref={modalRef}>
        <Heading>{name}</Heading>
        {message && <Description>{message}</Description>}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onConfirm(event.currentTarget.input.value);
            onCancel();
          }}
          onKeyDown={(event) => {
            console.log("key press");
            handleKeyDown(event, () => {}, onCancel);
          }}
        >
          {input && <input name="input" placeholder={input} autoFocus />}
          <ConfirmButton type="submit">Confirm</ConfirmButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </form>
      </ModalInner>
    </ModalOuter>,
    document.getElementById(modalId)
  );
};

export default Modal;
