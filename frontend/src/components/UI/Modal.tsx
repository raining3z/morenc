import { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 600px;
  max-width: 800px;
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #000;
  }
`;

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Backdrop />
      <ModalWrapper>
        <CloseButton onClick={() => setIsOpen(false)} />
        {children}
      </ModalWrapper>
    </>
  );
}
