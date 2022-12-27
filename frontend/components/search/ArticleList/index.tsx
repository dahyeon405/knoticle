import { FixedSizeList as List } from 'react-window';

import ArticleItem from '@components/search/ArticleItem';
import { IArticleBook } from '@interfaces';

interface ArticleListProps {
  articles: IArticleBook[];
  keywords: string[];
}

export default function ArticleList({ articles, keywords }: ArticleListProps) {
  return (
    <List
      height={window.innerHeight - 215}
      width="100%"
      itemSize={110.95}
      itemData={{ articles, keywords }}
      itemCount={articles.length}
    >
      {ArticleItem}
    </List>
  );
}
