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
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tabStatus, setTabStatus] = useState<'knotted' | 'bookmarked'>('knotted');

  // booklisttabwrapper 아래에 들어가야함  {isEditing && <EditModeIndicator>수정 모드</EditModeIndicator>}
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
