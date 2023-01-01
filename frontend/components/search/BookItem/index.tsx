import { CSSProperties } from 'react';

import Book from '@components/common/Book';
import { highlightKeyword } from '@utils/highlight-keyword';

import BookContainer from './styled';

interface BookItemProps {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: any;
}

export default function BookItem({ style, columnIndex, rowIndex, data }: BookItemProps) {
  const { books, keywords } = data;
  const book = books[columnIndex + rowIndex * 3];

  return (
    book && (
      <div style={style}>
        <BookContainer key={book.id}>
          <Book key={book.id} book={{ ...book, title: highlightKeyword(book.title, keywords) }} />
        </BookContainer>
      </div>
    )
  );
}
