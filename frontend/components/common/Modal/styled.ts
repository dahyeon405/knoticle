import styled from 'styled-components';

export const Dimmed = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 98;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: var(--window-inner-height);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const ModalInner = styled.div`
  width: 360px;
  padding: 32px;
  background: var(--white-color);
  border-radius: 30px;
  z-index: 100;

  @media ${(props) => props.theme.mobile} {
    width: 320px;
    padding: 32px 20px;
  }
`;

export const ButtonWrapper = styled.div<{ hasBackward?: boolean }>`
  display: flex;
  justify-content: space-between;

  img:first-child {
    visibility: ${(props) => (props.hasBackward ? 'visible' : 'hidden')};
  }
`;

export const ModalTitle = styled.div`
  text-align: center;
`;
