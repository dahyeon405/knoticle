import Image from 'next/image';

import styled from 'styled-components';

import { TextLinkMedium } from '@styles/common';

export const EditModeIndicator = styled(TextLinkMedium)`
  position: absolute;
  background-color: var(--red-color);
  padding: 5px 10px;
  color: var(--white-color);
  width: auto;
  border-radius: 10px;
  right: 0;
`;

export const EditBookWrapper = styled.div`
  position: relative;
`;

export const EditModalOpener = styled.div`
  position: absolute;
  z-index: 4;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const MinusButton = styled.button`
  z-index: 5;
  position: absolute;
  display: center;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: var(--red-color);
  right: -10px;
  top: -10px;
`;

export const MinusIcon = styled(Image)``;
