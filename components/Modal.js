import styled from "styled-components";
import { Button, Input } from "./Styles";
import { createModal, useClickOutside } from "../lib/util";
import { handleKeyDown } from "../lib/handlers";
import { useRef } from "react";
import ReactDOM from "react-dom";
import colors from "./colors";

const ModalOuter = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 55;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
`;

const ModalInner = styled.div`
  position: relative;
  height: auto;
  border-radius: 5px;
  border-style: none;
  outline: none;
  background-color: ${colors.lightGrey};
  margin: 0 auto;
  margin-top: 30px;
  overflow-y: auto;

  width: 700px;
  padding: 25px;
`;

const Heading = styled.h3`
  margin: 20px 0;
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
`;

const Description = styled.p`
  font-size: 1.2rem;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  grid-gap: 14px;
  margin-top: 10px;
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
            const text = event.currentTarget.input.value;
            if (text !== "") {
              onConfirm(event.currentTarget.input.value);
              onCancel();
            }
          }}
          onKeyDown={(event) => {
            handleKeyDown(event, () => {}, onCancel);
          }}
        >
          {input && (
            <Input
              name="input"
              placeholder={input}
              autoFocus
              autoComplete="off"
            />
          )}
          <ButtonsWrapper>
            <Button type="submit" className="confirm tilt">
              Confirm
            </Button>
            <Button onClick={onCancel} className="cancel tilt">
              Cancel
            </Button>
          </ButtonsWrapper>
        </form>
      </ModalInner>
    </ModalOuter>,
    document.getElementById(modalId)
  );
};

export default Modal;
