import { useCallback, useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { postBookmarkApi, deleteBookmarkApi } from '@apis/bookmarkApi';
import signInStatusState from '@atoms/signInStatus';
import { IBookScraps } from '@interfaces';
import { toastError } from '@utils/toast';

import useFetch from './useFetch';

const useBookmark = (book: IBookScraps) => {
  const signInStatus = useRecoilValue(signInStatusState);

  const { _count, bookmarks } = book;
  const [curBookmarkId, setCurBookmarkId] = useState<number | null>(
    bookmarks.length ? bookmarks[0].id : null
  );
  const [curBookmarkCnt, setCurBookmarkCnt] = useState(_count.bookmarks);

  const { data: postedBookmark, execute: postBookmark } = useFetch(postBookmarkApi);
  const { data: deletedBookmark, execute: deleteBookmark } = useFetch(deleteBookmarkApi);

  const handleBookmarkClick = useCallback(async () => {
    if (signInStatus.id === 0) {
      toastError('로그인이 필요합니다.');
      return;
    }

    if (curBookmarkId) {
      deleteBookmark({ bookmarkId: curBookmarkId });
    } else {
      postBookmark({ book_id: book.id });
    }
  }, [curBookmarkId]);

  // 북마크 등록 시
  useEffect(() => {
    if (!postedBookmark) return;
    setCurBookmarkId(postedBookmark.bookmarkId);
    setCurBookmarkCnt(curBookmarkCnt + 1);
  }, [postedBookmark]);

  // 북마크 해제 시
  useEffect(() => {
    if (!deletedBookmark) return;
    setCurBookmarkId(null);
    setCurBookmarkCnt(curBookmarkCnt - 1);
  }, [deletedBookmark]);

  return { handleBookmarkClick, curBookmarkCnt, curBookmarkId };
};

export default useBookmark;
