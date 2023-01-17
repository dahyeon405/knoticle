import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useRecoilState } from 'recoil';

import { getUserBookmarkedBooksApi, getUserKnottedBooksApi } from '@apis/bookApi';
import { updateUserProfileApi } from '@apis/userApi';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import signInStatusState from '@atoms/signInStatus';
import useFetch from '@hooks/useFetch';
import { IUser } from '@interfaces';

import UserProfile from '../Common/UserProfile';
import BookListTab from './BookListTab';
import EditUserProfile from './EditUserProfile';

interface MyStudyProps {
  curUserProfile: IUser;
  setCurUserProfile: Dispatch<SetStateAction<IUser>>;
}

export default function MyStudy({ curUserProfile, setCurUserProfile }: MyStudyProps) {
  // 프로필 수정 관련
  const [signInStatus, setSignInStatus] = useRecoilState(signInStatusState);

  const { data: updatedUserProfile, execute: updateUserProfile } = useFetch(updateUserProfileApi);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (updatedUserProfile === undefined || !curUserProfile) return;

    setIsEditing(false);
    setSignInStatus({
      ...signInStatus,
      nickname: updatedUserProfile.nickname,
    });
    setCurUserProfile(updatedUserProfile);
    window.history.replaceState(null, '', `/study/${updatedUserProfile.nickname}`);
  }, [updatedUserProfile]);

  // 책 데이터 관련
  const { data: knottedBookList } = useQuery('userKnottedBookList', () =>
    getUserKnottedBooksApi(curUserProfile.nickname)
  );

  const { data: bookmarkedBookList } = useQuery('userBookmarkedBookList', () =>
    getUserBookmarkedBooksApi(curUserProfile.nickname)
  );

  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);

  useEffect(() => {
    if (!knottedBookList) return;
    setCurKnottedBookList(knottedBookList);
  }, [knottedBookList]);

  return (
    <>
      {isEditing ? (
        <EditUserProfile curUserProfile={curUserProfile} updateUserProfile={updateUserProfile} />
      ) : (
        <UserProfile
          curUserProfile={curUserProfile}
          handleEditBtnClick={() => {
            setIsEditing(true);
          }}
        />
      )}
      <BookListTab bookmarkedBookList={bookmarkedBookList} />
    </>
  );
}
