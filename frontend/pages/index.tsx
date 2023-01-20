import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getOrderedBookListApi } from '@apis/bookApi';
import Footer from '@components/common/Footer';
import GNB from '@components/common/GNB';
import HomeHead from '@components/home/HomeHead';
import Slider from '@components/home/Slider';
import { PageInnerLarge, PageWrapper } from '@styles/layout';

export default function Home() {
  const { data: newestBookList, isLoading: isNewBookListLoading } = useQuery(
    'orderedBookList',
    () => getOrderedBookListApi('newest'),
    { staleTime: 20000 }
  );

  const { data: popularBookList, isLoading: isPopularBookListLoading } = useQuery(
    'popularBookList',
    () => getOrderedBookListApi('bookmark'),
    { staleTime: 20000 }
  );

  const [numberPerPage, setNumberPerPage] = useState(0);

  const resizingHandler = () => {
    switch (true) {
      case window.innerWidth > 1300:
        setNumberPerPage(4);
        break;
      case window.innerWidth > 1000:
        setNumberPerPage(3);
        break;
      case window.innerWidth > 700:
        setNumberPerPage(2);
        break;
      default:
        setNumberPerPage(1);
        break;
    }
  };

  useEffect(() => {
    resizingHandler();
    window.addEventListener('resize', resizingHandler);

    return () => {
      window.removeEventListener('resize', resizingHandler);
    };
  }, []);

  return (
    <>
      <HomeHead />
      <GNB />
      <PageWrapper>
        <PageInnerLarge>
          {numberPerPage !== 0 && (
            <>
              <Slider
                bookList={popularBookList}
                title="가장 인기 있는 책"
                isLoading={isPopularBookListLoading}
                numberPerPage={numberPerPage}
              />
              <Slider
                bookList={newestBookList}
                title="새로 엮은 책"
                isLoading={isNewBookListLoading}
                numberPerPage={numberPerPage}
              />
              <Footer />
            </>
          )}
        </PageInnerLarge>
      </PageWrapper>
    </>
  );
}
