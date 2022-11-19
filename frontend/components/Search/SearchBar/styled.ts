import styled from 'styled-components';

export const SearchArea = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;

export const SearchBarWrapper = styled.div`
  border-bottom: 1px solid var(--title-active-color);
  display: flex;
  align-items: center;
`;

export const SearchBarInput = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  font-size: 32px;
`;
