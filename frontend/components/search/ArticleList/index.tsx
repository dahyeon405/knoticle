import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import ArticleItem from '@components/search/ArticleItem';
import { IArticleBook } from '@interfaces';

interface ArticleListProps {
  articles: IArticleBook[];
  keywords: string[];
  isItemLoaded: () => boolean;
  loadMoreItems: () => Promise<void>;
}

export default function ArticleList({
  articles,
  keywords,
  isItemLoaded,
  loadMoreItems,
}: ArticleListProps) {
  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={articles.length}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={window.innerHeight - 215}
          width="100%"
          itemSize={110.95}
          itemData={{ articles, keywords }}
          itemCount={articles.length}
          ref={ref}
          onItemsRendered={onItemsRendered}
        >
          {ArticleItem}
        </List>
      )}
    </InfiniteLoader>
  );
}
