import Image from 'next/image';

import { useState } from 'react';

import { useRecoilState } from 'recoil';

import { deleteArticleApi } from '@apis/articleApi';
import { deleteBookApi, editBookApi } from '@apis/bookApi';
import { deleteScrapApi } from '@apis/scrapApi';
import Add from '@assets/ico_add.svg';
import CheckWhite from '@assets/ico_check_white.svg';
import EditWhite from '@assets/ico_edit_white.svg';
import editInfoState from '@atoms/editInfo';
import Modal from '@components/common/Modal';
import useFetch from '@hooks/useFetch';
import { toastSuccess } from '@utils/toast';

import AddBook from '../AddBook';
import { FabButton, FabWrapper } from './styled';

interface FabProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export default function FAB({ isEditing, setIsEditing }: FabProps) {
  const { execute: deleteBook } = useFetch(deleteBookApi);
  const { execute: editBook } = useFetch(editBookApi);
  const { execute: deleteArticle } = useFetch(deleteArticleApi);
  const { execute: deleteScrap } = useFetch(deleteScrapApi);

  const [editInfo, setEditInfo] = useRecoilState(editInfoState);

  const [isModalShown, setModalShown] = useState(false);

  const handleModalOpen = () => {
    setModalShown(true);
  };
  const handleModalClose = () => {
    setModalShown(false);
  };

  const handleEditFinishBtnClick = () => {
    setIsEditing(false);
    editInfo.deleted.forEach((bookId) => {
      deleteBook(bookId);
    });
    editInfo.editted.forEach((edit) => {
      editBook(edit);
    });
    editInfo.deletedArticle.forEach((articleId) => {
      deleteArticle(articleId);
    });
    editInfo.deletedScraps.forEach((scrapId) => {
      deleteScrap(scrapId);
    });
    setEditInfo({
      deleted: [],
      editted: [],
      deletedArticle: [],
      deletedScraps: [],
    });
    toastSuccess(`수정 완료되었습니다`);
  };

  return (
    <FabWrapper>
      <FabButton onClick={handleModalOpen}>
        <Image src={Add} alt="책 추가" />
      </FabButton>

      {isEditing ? (
        <FabButton isGreen onClick={handleEditFinishBtnClick}>
          <Image src={CheckWhite} alt="책 수정 완료" />
        </FabButton>
      ) : (
        <FabButton
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <Image src={EditWhite} alt="책 수정" />
        </FabButton>
      )}
      {isModalShown && (
        <Modal title="책 추가하기" handleModalClose={handleModalClose}>
          <AddBook handleModalClose={handleModalClose} />
        </Modal>
      )}
    </FabWrapper>
  );
}
