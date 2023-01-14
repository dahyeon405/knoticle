import React, { useState } from 'react';

import BookmarkBookListTab from './BookmarkBookListTab';
import KnottedBookListTab from './KnottedBookListTab';
import { BookListTabWrapper, EditModeIndicator, TabTitle, TabTitleContent } from './styled';

interface BookListTabProps {
  isUserMatched: boolean;
}

export default function BookListTab({ isUserMatched }: BookListTabProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tabStatus, setTabStatus] = useState<'knotted' | 'bookmarked'>('knotted');

  return (
    <BookListTabWrapper>
      {isEditing && <EditModeIndicator>수정 모드</EditModeIndicator>}
      <TabTitle>
        <TabTitleContent
          onClick={() => {
            setTabStatus('knotted');
          }}
          isActive={tabStatus === 'knotted'}
        >
          엮은 책
        </TabTitleContent>
        <TabTitleContent
          onClick={() => {
            setTabStatus('bookmarked');
            setIsEditing(false);
          }}
          isActive={tabStatus === 'bookmarked'}
        >
          북마크한 책
        </TabTitleContent>
      </TabTitle>
      {tabStatus === 'knotted' ? (
        <KnottedBookListTab isUserMatched={isUserMatched} />
      ) : (
        <BookmarkBookListTab />
      )}
    </BookListTabWrapper>
  );
}
