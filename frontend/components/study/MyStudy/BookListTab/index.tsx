import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useRecoilState, useSetRecoilState } from 'recoil';

import MinusWhite from '@assets/ico_minus_white.svg';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import editInfoState from '@atoms/editInfo';
import scrapState from '@atoms/scrap';
import Book from '@components/common/Book';
import Modal from '@components/common/Modal';
import EditBookModal from '@components/study/MyStudy/EditBookModal';
import FAB from '@components/study/MyStudy/FAB';
import { IScrap } from '@interfaces';
import { IBookScraps } from 'interfaces/combined.interface';

import { BookGrid, BookListTabWrapper } from '../../Common/styled';
import TabTitle from '../../Common/TabTitle';
import {
  EditBookWrapper,
  EditModalOpener,
  EditModeIndicator,
  MinusButton,
  MinusIcon,
} from './styled';

interface BookListTabProps {
  bookmarkedBookList: IBookScraps[];
}

export default function BookListTab({ bookmarkedBookList }: BookListTabProps) {
  // 탭 관련
  const [tabStatus, setTabStatus] = useState<'knotted' | 'bookmarked'>('knotted');

  const queryClient = useQueryClient();

  useEffect(() => {
    if (tabStatus === 'bookmarked') queryClient.invalidateQueries('userBookmarkedBookList');
    if (tabStatus === 'knotted') queryClient.invalidateQueries('userKnottedBookList');
  }, [tabStatus]);

  // 책 수정 관련
  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);

  const [editInfo, setEditInfo] = useRecoilState(editInfoState);
  const setScraps = useSetRecoilState(scrapState);

  const [isModalShown, setModalShown] = useState(false);
  const [curEditBook, setCurEditBook] = useState<IBookScraps | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditBookModalOpen = (id: number) => {
    const curBook = curKnottedBookList?.find((v: IBookScraps) => v.id === id);
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
    const curBook = curKnottedBookList.find((book: IBookScraps) => book.id === id);
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
      <BookListTabWrapper>
        {isEditing && <EditModeIndicator>수정 모드</EditModeIndicator>}
        <TabTitle tabStatus={tabStatus} setTabStatus={setTabStatus} />
        {tabStatus === 'knotted' ? (
          <BookGrid>
            {curKnottedBookList &&
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
        ) : (
          <BookGrid>
            {bookmarkedBookList &&
              bookmarkedBookList.map((book: IBookScraps) => <Book key={book.id} book={book} />)}
          </BookGrid>
        )}
      </BookListTabWrapper>

      <FAB isEditing={isEditing} setIsEditing={setIsEditing} />

      {isModalShown && (
        <Modal title="내 책 수정하기" handleModalClose={handleModalClose}>
          {curEditBook && <EditBookModal book={curEditBook} handleModalClose={handleModalClose} />}
        </Modal>
      )}
    </>
  );
}
