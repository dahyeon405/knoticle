import React, { useState } from 'react';

import Book from '@components/common/Book';
import { IBookScraps } from 'interfaces/combined.interface';

import { BookGrid, BookListTabWrapper } from '../../Common/styled';
import TabTitle from '../../Common/TabTitle';

interface BookListTabProps {
  knottedBookList: IBookScraps[];
  bookmarkedBookList: IBookScraps[];
}

export default function BookListTab({ knottedBookList, bookmarkedBookList }: BookListTabProps) {
  const [tabStatus, setTabStatus] = useState<'knotted' | 'bookmarked'>('knotted');

  return (
    <BookListTabWrapper>
      <TabTitle tabStatus={tabStatus} setTabStatus={setTabStatus} />
      {tabStatus === 'knotted' ? (
        <BookGrid>
          {knottedBookList && knottedBookList.map((book) => <Book key={book.id} book={book} />)}
        </BookGrid>
      ) : (
        <BookGrid>
          {bookmarkedBookList &&
            bookmarkedBookList.map((book) => <Book key={book.id} book={book} />)}
        </BookGrid>
      )}
    </BookListTabWrapper>
  );
}
