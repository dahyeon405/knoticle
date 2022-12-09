import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { getArticleApi } from '@apis/articleApi';
import { getBookApi, getUserKnottedBooksApi } from '@apis/bookApi';
import signInStatusState from '@atoms/signInStatus';
import GNB from '@components/common/GNB';
import Modal from '@components/common/Modal';
import ArticleContainer from '@components/viewer/ArticleContent';
import ClosedSideBar from '@components/viewer/ClosedSideBar';
import ScrapModal from '@components/viewer/ScrapModal';
import TOC from '@components/viewer/TOC';
import ViewerHead from '@components/viewer/ViewerHead';
import useFetch from '@hooks/useFetch';
import { IArticleBook, IBookScraps } from '@interfaces';
import { Flex } from '@styles/layout';

interface ViewerProps {
  article: IArticleBook;
}

export default function Viewer({ article }: ViewerProps) {
  const { data: userBooks, execute: getUserKnottedBooks } = useFetch(getUserKnottedBooksApi);
  const { data: book, execute: getBook } = useFetch<IBookScraps>(getBookApi);

  const user = useRecoilValue(signInStatusState);

  const [isOpened, setIsOpened] = useState(false);

  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => setModalShown(true);
  const handleModalClose = () => setModalShown(false);
  const router = useRouter();

  const handleSideBarToggle = () => {
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    getUserKnottedBooks(user.nickname);
  }, [user.nickname]);

  const checkArticleAuthority = (targetBook: IBookScraps, id: number) => {
    if (targetBook.scraps.find((scrap) => scrap.article.id === id)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Array.isArray(router.query.data) && router.query.data?.length === 2) {
      const bookId = router.query.data[0];
      getBook(bookId);
    }
  }, [router.query.data]);

  useEffect(() => {
    if (!book) return;
    if (!checkArticleAuthority(book, article.id)) router.push('/404');
  }, [book]);

  useEffect(() => {
    if (window.innerWidth > 576) setIsOpened(true);
  }, []);

  return (
    <>
      {article && <ViewerHead articleTitle={article.title} articleContent={article.content} />}
      <GNB />
      {book && article ? (
        <Flex>
          {isOpened ? (
            <TOC book={book} articleId={article.id} handleSideBarOnClick={handleSideBarToggle} />
          ) : (
            <ClosedSideBar handleSideBarOnClick={handleSideBarToggle} />
          )}
          {book.scraps.find((scrap) => scrap.article.id === article.id) ? (
            <ArticleContainer
              article={article}
              scraps={book.scraps}
              bookId={book.id}
              bookAuthor={book.user.nickname}
              handleScrapBtnClick={handleModalOpen}
            />
          ) : (
            <div>올바르지 않은 접근입니다.</div>
          )}
        </Flex>
      ) : (
        <div>loading</div>
      )}
      {isModalShown && (
        <Modal title="글 스크랩하기" handleModalClose={handleModalClose}>
          <ScrapModal books={userBooks} handleModalClose={handleModalClose} article={article} />
        </Modal>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [bookId, articleId] = context.query.data as string[];
  const article = await getArticleApi(articleId);

  return { props: { article } };
};
