import { GetServerSideProps } from 'next';

import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { getUserProfileApi } from '@apis/userApi';
import signInStatusState from '@atoms/signInStatus';
import GNB from '@components/common/GNB';
import MyStudy from '@components/study/MyStudy';
import OtherStudy from '@components/study/OtherStudy';
import StudyHead from '@components/study/StudyHead';
import { IUser } from '@interfaces';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

interface StudyProps {
  userProfile: {
    id: number;
    profile_image: string;
    nickname: string;
    description: string;
  };
}

export default function Study({ userProfile }: StudyProps) {
  const signInStatus = useRecoilValue(signInStatusState);
  const [curUserProfile, setCurUserProfile] = useState<IUser>(userProfile);

  useEffect(() => {
    setCurUserProfile(userProfile);
  }, [userProfile]);

  return (
    <>
      <StudyHead
        userNickname={userProfile.nickname}
        userDescription={userProfile.description}
        userImage={userProfile.profile_image}
      />
      <GNB />
      {userProfile && (
        <PageWrapper>
          <PageInnerLarge>
            {signInStatus.nickname === curUserProfile.nickname ? (
              <MyStudy curUserProfile={curUserProfile} setCurUserProfile={setCurUserProfile} />
            ) : (
              <OtherStudy curUserProfile={userProfile} />
            )}
          </PageInnerLarge>
        </PageWrapper>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nickname = context.query.data as string;
  const data = await getUserProfileApi(nickname);

  return { props: { userProfile: data } };
};
