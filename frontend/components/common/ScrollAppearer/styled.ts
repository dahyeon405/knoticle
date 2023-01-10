import styled from 'styled-components';

export const ScrollAppearerTarget = styled.div<{
  isscrolldown: 'true' | 'false';
  height: string;
}>`
  z-index: 2;
  position: relative;

  animation: ${(props) => (props.isscrolldown === 'true' ? 'slideUp' : 'slideDown')} 0.3s forwards
    ease-in-out;

  @keyframes slideUp {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-${(props) => props.height});
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-${(props) => props.height});
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const ScrollAppearerWrapper = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  overflow-y: hidden;
  z-index: -2;
`;
