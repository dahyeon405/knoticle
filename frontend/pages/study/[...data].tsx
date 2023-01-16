import { GetServerSideProps } from 'next';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { getUserProfileApi, updateUserProfileApi } from '@apis/userApi';
import signInStatusState from '@atoms/signInStatus';
import GNB from '@components/common/GNB';
import BookListTab from '@components/study/BookListTab';
import EditUserProfile from '@components/study/EditUserProfile';
import StudyHead from '@components/study/StudyHead';
import UserProfile from '@components/study/UserProfile';
import useFetch from '@hooks/useFetch';
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
  const { data: updatedUserProfile, execute: updateUserProfile } = useFetch(updateUserProfileApi);

  const [signInStatus, setSignInStatus] = useRecoilState(signInStatusState);

  const [curUserProfile, setCurUserProfile] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditFinishBtnClick = () => {
    if (!curUserProfile) return;

    updateUserProfile(curUserProfile);
  };

  useEffect(() => {
    if (!userProfile) return;

    setCurUserProfile({
      ...userProfile,
    });
  }, [userProfile]);

  useEffect(() => {
    if (updatedUserProfile === undefined || !curUserProfile) return;

    setIsEditing(false);
    setSignInStatus({
      ...signInStatus,
      nickname: curUserProfile.nickname,
    });
    window.history.replaceState(null, '', `/study/${curUserProfile.nickname}`);
  }, [updatedUserProfile]);

  return (
    <>
      <StudyHead
        userNickname={userProfile.nickname}
        userDescription={userProfile.description}
        userImage={userProfile.profile_image}
      />
      <GNB />
      {curUserProfile && (
        <PageWrapper>
          <PageInnerLarge>
            {isEditing ? (
              <EditUserProfile
                handleEditFinishBtnClick={handleEditFinishBtnClick}
                curUserProfile={curUserProfile}
                setCurUserProfile={setCurUserProfile}
              />
            ) : (
              <UserProfile
                curUserProfile={curUserProfile}
                handleEditBtnClick={() => {
                  setIsEditing(true);
                }}
              />
            )}
            <BookListTab isUserMatched={signInStatus.id === curUserProfile.id} />
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
