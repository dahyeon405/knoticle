import { RefObject, SetStateAction, useEffect, useRef, Dispatch } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import useScrollDetector from '@hooks/useScrollDetector';
import useScrollSaver from '@hooks/useScrollSaver';
import { IBookScraps } from '@interfaces';

import BookItem from '../BookItem';
import BookListWrapper from './styled';

interface BookListProps {
  books: IBookScraps[];
  keywords: string[];
  isItemLoaded: () => boolean;
  loadMoreItems: () => Promise<void>;
  isInitialRendering: boolean;
}

export default function BookList({
  books,
  keywords,
  isItemLoaded,
  loadMoreItems,
  isInitialRendering,
}: BookListProps) {
  const target = useRef() as RefObject<HTMLDivElement>;
  const { scroll, setScroll } = useScrollSaver(target, 'BookScroll');

  useEffect(() => {
    if (!target.current) return;
    if (isInitialRendering) target.current.scrollTo(0, scroll);
    else {
      setScroll(0);
      if (target.current) target.current.scrollTo(0, 0);
    }
  }, [keywords, target.current]);

  return (
    <BookListWrapper>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={books.length}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => {
              const newItemsRendered = (gridData: any) => {
                const {
                  visibleRowStopIndex,
                  overscanRowStartIndex,
                  overscanRowStopIndex,
                  overscanColumnStopIndex,
                } = gridData;

                const visibleStartIndex = overscanRowStartIndex * overscanColumnStopIndex;
                const visibleStopIndex = overscanRowStopIndex * overscanColumnStopIndex;

                if (visibleRowStopIndex >= books.length / 3 - 1) {
                  onItemsRendered({ ...gridData, visibleStartIndex, visibleStopIndex });
                }
              };

              return (
                <Grid
                  height={height}
                  width={width}
                  columnCount={Math.floor(width / 300)}
                  columnWidth={290}
                  rowCount={Math.ceil(books.length / 3)}
                  rowHeight={500}
                  itemData={{ books, keywords }}
                  ref={ref}
                  onItemsRendered={newItemsRendered}
                  outerRef={target}
                >
                  {BookItem}
                </Grid>
              );
            }}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </BookListWrapper>
  );
}
