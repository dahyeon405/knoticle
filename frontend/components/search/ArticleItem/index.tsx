import Link from 'next/link';

import { CSSProperties } from 'react';

import { TextSmall, TextXSmall } from '@styles/common';
import { highlightKeyword, getTextAfterLastNewLine } from '@utils/highlight-keyword';
import { markdown2text } from '@utils/parser';

import {
  ItemContent,
  ItemGroup,
  ItemTitle,
  ItemWrapper,
  ProfileDescription,
  ProfileImage,
  UserProfile,
} from './styled';

interface ArticleItemProps {
  index: number;
  style: CSSProperties;
  data: any;
}

export default function ArticleItem({ style, index, data }: ArticleItemProps) {
  const { articles, keywords } = data;
  const article = articles[index];

  return (
    <div style={style}>
      {index === 0 ? (
        <div />
      ) : (
        <ItemWrapper>
          <ItemGroup>
            <Link href={`/viewer/${article.book.id}/${article.id}`}>
              <ItemTitle>{highlightKeyword(article.title, keywords)}</ItemTitle>
              <ItemContent>
                {highlightKeyword(
                  getTextAfterLastNewLine(markdown2text(article.content), keywords),
                  keywords
                )}
              </ItemContent>
            </Link>
          </ItemGroup>
          <Link href={`/study/${article.book.user.nickname}`}>
            <UserProfile>
              <ProfileDescription>
                <TextXSmall>Written By</TextXSmall>
                <TextSmall>{article.book.user.nickname}</TextSmall>
              </ProfileDescription>
              <ProfileImage
                src={article.book.user.profile_image}
                alt="profile"
                width={72}
                height={72}
              />
            </UserProfile>
          </Link>
        </ItemWrapper>
      )}
    </div>
  );
}
