import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexSpaceBetween = styled(Flex)`
  display: flex;
  justify-content: space-between;
`;

export const FlexColumnCenter = styled(FlexColumn)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumnSpaceBetween = styled(FlexColumn)`
  justify-content: space-between;
`;

export const FlexColumnAlignCenter = styled(FlexColumn)`
  align-items: center;
`;

export const FullPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const PageWrapper = styled.div`
  padding-top: 64px;
  min-height: calc(100vh - 131px);
  background-color: var(--light-yellow-color);
`;

export const PageInnerSmall = styled(FlexColumnAlignCenter)`
  margin: 0 auto;
  max-width: 900px;
  padding: 0px 10px;
`;

export const PageInnerLarge = styled(FlexColumnAlignCenter)`
  margin: 0 auto;
  max-width: 1500px;
`;

export const TopBar = styled.nav`
  height: 67px;
`;

export const PageNoScrollWrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0px;
  width: 100%;
`;

export const PageGNBHide = styled.div`
  position: absolute;
  width: 100%;
`;

export const PageWrapperWithHeight = styled.div<{ initialHeight: number }>`
  padding-top: 32px;
  background-color: var(--light-yellow-color);
  min-height: ${(props) =>
    props.initialHeight !== 0 ? `${props.initialHeight + 600}px` : 'calc(100vh - 99px)'};
`;

export const PageWrapperPaddingSmall = styled.div`
  padding-top: 32px;
  min-height: calc(100vh - 99px);
  background-color: var(--light-yellow-color);
`;
