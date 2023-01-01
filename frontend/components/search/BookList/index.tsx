import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { IBookScraps } from '@interfaces';

import BookItem from '../BookItem';
import BookListWrapper from './styled';

interface BookListProps {
  books: IBookScraps[];
  keywords: string[];
  isItemLoaded: () => boolean;
  loadMoreItems: () => Promise<void>;
}

export default function BookList({ books, keywords, isItemLoaded, loadMoreItems }: BookListProps) {
  return (
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
          <BookListWrapper>
            <Grid
              height={460}
              width={950}
              columnCount={3}
              columnWidth={300}
              rowCount={Math.ceil(books.length / 3)}
              rowHeight={600}
              itemData={{ books, keywords }}
              ref={ref}
              onItemsRendered={newItemsRendered}
            >
              {BookItem}
            </Grid>
          </BookListWrapper>
        );
      }}
    </InfiniteLoader>
  );
}
