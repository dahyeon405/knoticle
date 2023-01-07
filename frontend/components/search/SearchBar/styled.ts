import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--title-active-color);
  display: flex;
  align-items: center;
`;

export const SearchBarInput = styled.input<{ shrinked: boolean }>`
  flex: 1;
  background-color: var(--light-yellow-color);
  padding: 8px;
  border: none;
  outline: none;
  font-family: Noto Sans KR;
  width: 100%;

  font-size: ${(props) => (props.shrinked ? '24px' : '32px')};
  text-align: ${(props) => (props.shrinked ? 'center' : 'left')};
`;

export const SearchIconBox = styled.div<{ visibility: boolean }>`
  visibility: ${(props) => (props.visibility ? 'visible' : 'hidden')};
`;
