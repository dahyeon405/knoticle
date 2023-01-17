import { Dispatch, SetStateAction } from 'react';

import { TabTitleWrapper, TabTitleContent } from './styled';

interface TabTitleProps {
  tabStatus: 'knotted' | 'bookmarked';
  setTabStatus: Dispatch<SetStateAction<'knotted' | 'bookmarked'>>;
}

export default function TabTitle({ tabStatus, setTabStatus }: TabTitleProps) {
  return (
    <TabTitleWrapper>
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
        }}
        isActive={tabStatus === 'bookmarked'}
      >
        북마크한 책
      </TabTitleContent>
    </TabTitleWrapper>
  );
}
