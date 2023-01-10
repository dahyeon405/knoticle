import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import ArticleItem from '@components/search/ArticleItem';
import useScrollDetector from '@hooks/useScrollDetector';
import useScrollSaver from '@hooks/useScrollSaver';
import { IArticleBook } from '@interfaces';

import ArticleListWrapper from './styled';

interface ArticleListProps {
  articles: IArticleBook[];
  keywords: string[];
  isItemLoaded: () => boolean;
  loadMoreItems: () => Promise<void>;
  isInitialRendering: boolean;
  setIsScrollDown: Dispatch<SetStateAction<boolean>>;
}

export default function ArticleList({
  articles,
  keywords,
  isInitialRendering,
  isItemLoaded,
  loadMoreItems,
  setIsScrollDown,
}: ArticleListProps) {
  const target = useRef() as RefObject<HTMLDivElement>;
  const { scroll, setScroll } = useScrollSaver(target, 'ArticleScroll');

  const isScrollDown = useScrollDetector(target, 1);

  useEffect(() => {
    if (!target.current) return;
    if (isInitialRendering) target.current.scrollTo(0, scroll);
    else {
      setScroll(0);
      if (target.current) target.current.scrollTo(0, 0);
    }
  }, [keywords, target.current]);

  useEffect(() => {
    setIsScrollDown(isScrollDown);
  }, [isScrollDown]);

  return (
    <ArticleListWrapper>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={articles.length}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                width={width}
                itemSize={110.95}
                itemData={{ articles, keywords }}
                itemCount={articles.length}
                ref={ref}
                onItemsRendered={onItemsRendered}
                outerRef={target}
                initialScrollOffset={scroll}
                overscanCount={10}
              >
                {ArticleItem}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </ArticleListWrapper>
  );
}
