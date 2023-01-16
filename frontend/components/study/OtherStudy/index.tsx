import { useEffect } from 'react';

import { getUserBookmarkedBooksApi, getUserKnottedBooksApi } from '@apis/bookApi';
import useFetch from '@hooks/useFetch';
import { IUser } from '@interfaces';

import UserProfile from '../Common/UserProfile';
import BookListTab from './BookListTab';

interface OtherStudyProps {
  curUserProfile: IUser;
}

export default function OtherStudy({ curUserProfile }: OtherStudyProps) {
  const { data: knottedBookList, execute: getKnottedBookList } = useFetch(getUserKnottedBooksApi);
  const { data: bookmarkedBookList, execute: getBookmarkedBookList } =
    useFetch(getUserBookmarkedBooksApi);

  useEffect(() => {
    if (!curUserProfile) return;

    const { nickname } = curUserProfile;
    getKnottedBookList(nickname);
    getBookmarkedBookList(nickname);
  }, [curUserProfile]);

  return (
    <>
      <UserProfile curUserProfile={curUserProfile} />
      <BookListTab knottedBookList={knottedBookList} bookmarkedBookList={bookmarkedBookList} />
    </>
  );
}
