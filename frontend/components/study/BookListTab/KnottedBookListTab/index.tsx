import router from 'next/router';

import { useEffect, useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { getUserKnottedBooksApi } from '@apis/bookApi';
import MinusWhite from '@assets/ico_minus_white.svg';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import editInfoState from '@atoms/editInfo';
import scrapState from '@atoms/scrap';
import Book from '@components/common/Book';
import Modal from '@components/common/Modal';
import EditBookModal from '@components/study/EditBookModal';
import FAB from '@components/study/FAB';
import useFetch from '@hooks/useFetch';
import { IScrap } from '@interfaces';
import { IBookScraps } from 'interfaces/combined.interface';

import { BookGrid, EditBookWrapper, EditModalOpener, MinusButton, MinusIcon } from './styled';

interface BookListTabProps {
  isUserMatched: boolean;
}

export default function KnottedBookListTab({ isUserMatched }: BookListTabProps) {
  const { data: knottedBookList, execute: getKnottedBookList } = useFetch(getUserKnottedBooksApi);

  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);

  const [editInfo, setEditInfo] = useRecoilState(editInfoState);
  const setScraps = useSetRecoilState(scrapState);

  const [isModalShown, setModalShown] = useState(false);
  const [curEditBook, setCurEditBook] = useState<IBookScraps | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (!router.query.data) return;

    const nickname = router.query.data;
    getKnottedBookList(nickname);
  }, [router.query.data]);

  useEffect(() => {
    if (!knottedBookList) return;
    setCurKnottedBookList(knottedBookList);
    if (isInitialLoading) setIsInitialLoading(false);
  }, [knottedBookList]);

  const handleEditBookModalOpen = (id: number) => {
    const curBook = knottedBookList?.find((v: IBookScraps) => v.id === id);
    if (!curBook) return;

    setModalShown(true);
    setCurEditBook(curBook);
    setScraps(curBook.scraps);
  };

  const handleModalClose = () => {
    setModalShown(false);
    setScraps([]);
  };

  const handleMinusBtnClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    const curBook = knottedBookList.find((book: IBookScraps) => book.id === id);
    if (!curBook) return;
    const originalArticleList: number[] = [];

    curBook.scraps.forEach((scrap: IScrap) => {
      if (scrap.is_original) originalArticleList.push(scrap.article.id);
    });

    if (window.confirm('이 책에는 원본글이 포함되어 있습니다. 정말로 삭제하시겠습니까?')) {
      setCurKnottedBookList([...curKnottedBookList.filter((book) => id !== book.id)]);
      setEditInfo({
        ...editInfo,
        deleted: [...editInfo.deleted, id],
        deletedArticle: [...editInfo.deletedArticle, ...originalArticleList],
      });
    }
  };

  const handleEditModalOpenerClick = (e: React.MouseEvent<HTMLDivElement>, bookId: number) => {
    handleEditBookModalOpen(bookId);
  };

  return (
    <>
      <BookGrid>
        {!isInitialLoading &&
          curKnottedBookList &&
          curKnottedBookList.map((book: IBookScraps) =>
            isEditing ? (
              <EditBookWrapper key={book.id}>
                <MinusButton
                  onClick={(e) => {
                    handleMinusBtnClick(e, book.id);
                  }}
                >
                  <MinusIcon src={MinusWhite} alt="책 삭제" />
                </MinusButton>
                <EditModalOpener
                  onClick={(e) => {
                    handleEditModalOpenerClick(e, book.id);
                  }}
                />
                <Book book={book} />
              </EditBookWrapper>
            ) : (
              <Book key={book.id} book={book} />
            )
          )}
      </BookGrid>

      {isUserMatched && <FAB isEditing={isEditing} setIsEditing={setIsEditing} />}

      {isModalShown && (
        <Modal title="내 책 수정하기" handleModalClose={handleModalClose}>
          {curEditBook && <EditBookModal book={curEditBook} handleModalClose={handleModalClose} />}
        </Modal>
      )}
    </>
  );
}
