import styled from 'styled-components';

import { TextLinkMedium } from '@styles/common';

export const TabTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 30px;
`;
export const TabTitleContent = styled(TextLinkMedium)<{ isActive: boolean }>`
  cursor: pointer;
  font-size: 18px;
  line-height: 24px;
  ${(props) => (props.isActive ? 'color: var(--primary-color); text-decoration:underline' : '')}
`;
