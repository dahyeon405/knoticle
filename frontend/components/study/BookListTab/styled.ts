import styled from 'styled-components';

import { TextLinkMedium } from '@styles/common';

export const BookListTabWrapper = styled.div`
  position: relative;
  margin-top: 20px;
`;
export const TabTitle = styled.div`
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

export const EditModeIndicator = styled(TextLinkMedium)`
  position: absolute;
  background-color: var(--red-color);
  padding: 5px 10px;
  color: var(--white-color);
  width: auto;
  border-radius: 10px;
  right: 0;
`;
