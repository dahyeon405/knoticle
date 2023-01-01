import styled from 'styled-components';

const ArticleListWrapper = styled.div`
  width: 100%;
  height: calc(var(--window-inner-height) - 214px);

  div {
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: var(--grey-02-color);
      border-radius: 10px;
    }
  }
`;

export default ArticleListWrapper;
