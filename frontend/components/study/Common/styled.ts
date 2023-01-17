import styled from 'styled-components';

export const BookListTabWrapper = styled.div`
  position: relative;
  margin-top: 20px;
`;

export const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  box-sizing: border-box;
  gap: 20px 0;
  padding: 20px;

  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
