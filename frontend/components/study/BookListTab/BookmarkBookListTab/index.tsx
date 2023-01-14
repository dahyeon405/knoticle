import router from 'next/router';

import { useEffect } from 'react';

import { getUserBookmarkedBooksApi } from '@apis/bookApi';
import Book from '@components/common/Book';
import useFetch from '@hooks/useFetch';

import BookGrid from './styled';

export default function BookmarkBookListTab() {
  const {
    data: bookmarkedBookList,
    isLoading,
    execute: getBookmarkedBookList,
  } = useFetch(getUserBookmarkedBooksApi);

  useEffect(() => {
    if (!router.query.data) return;

    const nickname = router.query.data;
    getBookmarkedBookList(nickname);
  }, [router.query.data]);

  return (
    <BookGrid>
      {!isLoading && bookmarkedBookList.map((book) => <Book key={book.id} book={book} />)}
    </BookGrid>
  );
}
