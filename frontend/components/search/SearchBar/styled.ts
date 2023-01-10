import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--title-active-color);
  display: flex;
  align-items: center;
  background-color: var(--light-yellow-color);
  padding: 0px 10px;
  box-sizing: border-box;
`;

export const SearchBarInput = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  font-family: Noto Sans KR;
  width: 100%;
  background-color: var(--light-yellow-color);
  font-size: 32px;
`;
