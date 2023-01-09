import styled from 'styled-components';

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px 0px;
  background-color: var(--light-yellow-color);
`;

export const FilterGroup = styled.div`
  label:first-child {
    margin-right: 8px;
  }
`;

export const FilterLabel = styled.label`
  color: var(--title-active-color);
`;

export const FilterButton = styled.input`
  accent-color: var(--primary-color);
`;
