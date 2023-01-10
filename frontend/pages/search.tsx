import { ChangeEvent, useEffect, useState } from 'react';

import { searchArticlesApi } from '@apis/articleApi';
import { searchBooksApi } from '@apis/bookApi';
import GNB from '@components/common/GNB';
import ArticleList from '@components/search/ArticleList';
import BookList from '@components/search/BookList';
import SearchBar from '@components/search/SearchBar';
import SearchFilter from '@components/search/SearchFilter';
import SearchHead from '@components/search/SearchHead';
import SearchInputs from '@components/search/SearchInputs';
import SearchNoResult from '@components/search/SearchNoResult';
import useDebounce from '@hooks/useDebounce';
import useFetch from '@hooks/useFetch';
import useSessionStorage from '@hooks/useSessionStorage';
import { PageInnerSmall, PageWrapperPaddingSmall, PageNoScrollWrapper } from '@styles/layout';

export default function Search() {
  const { value: articles, setValue: setArticles } = useSessionStorage('articles', []);
  const { value: books, setValue: setBooks } = useSessionStorage('books', []);

  const {
    data: newArticles,
    isLoading: isArticleLoading,
    execute: searchArticles,
  } = useFetch(searchArticlesApi);
  const {
    data: newBooks,
    isLoading: isBookLoading,
    execute: searchBooks,
  } = useFetch(searchBooksApi);

  const { value: articlePage, setValue: setArticlePage } = useSessionStorage('articlePage', {
    hasNextPage: true,
    pageNumber: 2,
  });
  const { value: bookPage, setValue: setBookPage } = useSessionStorage('bookPage', {
    hasNextPage: true,
    pageNumber: 2,
  });

  const { value: filter, setValue: setFilter } = useSessionStorage('filter', {
    type: 'article',
    isUsers: false,
  });

  const { value: keyword, setValue: setKeyword } = useSessionStorage('keyword', '');

  const debouncedKeyword = useDebounce(keyword, 300);
  const [keywords, setKeywords] = useState<string[]>([]);

  const [isInitialRendering, setIsInitialRendering] = useState(true);

  const [isArticleNoResult, setIsArticleNoResult] = useState(false);
  const [isBookNoResult, setIsBookNoResult] = useState(false);

  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    setKeywords(
      debouncedKeyword
        .trim()
        .split(' ')
        .filter((word: string) => word)
    );
  }, [debouncedKeyword]);

  useEffect(() => {
    if (isInitialRendering) return;

    if (debouncedKeyword === '') {
      setArticles([]);
      setBooks([]);
      setIsArticleNoResult(false);
      setIsBookNoResult(false);
      setArticlePage({
        hasNextPage: true,
        pageNumber: 2,
      });
      setBookPage({
        hasNextPage: true,
        pageNumber: 2,
      });
      return;
    }

    searchArticles({
      query: debouncedKeyword,
      isUsers: filter.isUsers,
      page: 1,
      take: 12,
    });
    setArticlePage({
      hasNextPage: true,
      pageNumber: 2,
    });

    searchBooks({
      query: debouncedKeyword,
      isUsers: filter.isUsers,
      page: 1,
      take: 12,
    });
    setBookPage({
      hasNextPage: true,
      pageNumber: 2,
    });
  }, [debouncedKeyword, filter.isUsers]);

  useEffect(() => {
    if (!newArticles) return;

    if (newArticles.data.length === 0 && articlePage.pageNumber === 2) {
      setArticles([]);
      setIsArticleNoResult(true);
      return;
    }

    setIsArticleNoResult(false);

    if (articlePage.pageNumber === 2) setArticles(newArticles.data);
    else setArticles(articles.concat(newArticles.data));

    setArticlePage({
      ...articlePage,
      hasNextPage: newArticles.hasNextPage,
    });
  }, [newArticles]);

  useEffect(() => {
    if (!newBooks) return;

    if (newBooks.data.length === 0 && bookPage.pageNumber === 2) {
      setBooks([]);
      setIsBookNoResult(true);
      return;
    }

    setIsBookNoResult(false);

    if (bookPage.pageNumber === 2) setBooks(newBooks.data);
    else setBooks(books.concat(newBooks.data));

    setBookPage({
      ...bookPage,
      hasNextPage: newBooks.hasNextPage,
    });
  }, [newBooks]);

  const handleFilter = (value: { [value: string]: string | boolean }) => {
    setIsInitialRendering(false);
    setFilter({
      ...filter,
      ...value,
    });
  };

  const handleKeywordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInitialRendering(false);
    if (e.target) setKeyword(e.target.value);
  };

  const loadMoreItems = async () => {
    if (!debouncedKeyword) return;

    if (filter.type === 'article' && !isArticleNoResult) {
      if (!articlePage.hasNextPage) return;
      searchArticles({
        query: debouncedKeyword,
        isUsers: filter.isUsers,
        page: articlePage.pageNumber,
        take: 12,
      });
      setArticlePage({
        ...articlePage,
        pageNumber: articlePage.pageNumber + 1,
      });
    } else if (filter.type === 'book' && !isBookNoResult) {
      if (!bookPage.hasNextPage) return;
      searchBooks({
        query: debouncedKeyword,
        isUsers: filter.isUsers,
        page: bookPage.pageNumber,
        take: 12,
      });
      setBookPage({
        ...bookPage,
        pageNumber: bookPage.pageNumber + 1,
      });
    }
  };

  const syncHeight = () => {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
  };

  useEffect(() => {
    syncHeight();
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  return (
    <PageNoScrollWrapper>
      <SearchHead />
      <GNB />
      <PageWrapperPaddingSmall>
        <PageInnerSmall>
          <SearchInputs isScrollDown={isScrollDown}>
            <SearchBar onChange={handleKeywordOnChange} value={keyword} />
            <SearchFilter filter={filter} handleFilter={handleFilter} />
          </SearchInputs>
          {debouncedKeyword !== '' &&
            filter.type === 'article' &&
            (isArticleNoResult ? (
              <SearchNoResult />
            ) : (
              <ArticleList
                isItemLoaded={() => !isArticleLoading && !articlePage.hasNextPage}
                loadMoreItems={loadMoreItems}
                articles={articles}
                keywords={keywords}
                isInitialRendering={isInitialRendering}
                setIsScrollDown={setIsScrollDown}
              />
            ))}
          {debouncedKeyword !== '' &&
            filter.type === 'book' &&
            (isBookNoResult ? (
              <SearchNoResult />
            ) : (
              <BookList
                isItemLoaded={() => !isBookLoading && !bookPage.hasNextPage}
                loadMoreItems={loadMoreItems}
                books={books}
                keywords={keywords}
                isInitialRendering={isInitialRendering}
              />
            ))}
        </PageInnerSmall>
      </PageWrapperPaddingSmall>
    </PageNoScrollWrapper>
  );
}
