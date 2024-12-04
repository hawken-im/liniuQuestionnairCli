import styled from '@emotion/styled';
import { useEffect } from 'react';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContent = styled.div`
  z-index: 101;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 101;
  transform: translateY(${(props: { show: boolean }) => (props.show ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
`;

const BottomSheet = ({ children, show, onClose }: { children: React.ReactNode; show: boolean; onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleEsc);
    } else {
      document.removeEventListener('keydown', handleEsc);
    }

    return () => document.removeEventListener('keydown', handleEsc);
  }, [show, onClose]);

  return (
    <>
      {show && <Backdrop onClick={(e) => { 
          e.stopPropagation(); 
          onClose(); 
        }} />}
      <ModalContent show={show}>
        {children}
      </ModalContent>
    </>
  );
};

export default BottomSheet;