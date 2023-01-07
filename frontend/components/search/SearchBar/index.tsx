import Image from 'next/image';

import SearchIcon from '@assets/ico_search.svg';

import { SearchBarInput, SearchBarWrapper, SearchIconBox } from './styled';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isScrollDown: boolean;
}

export default function SearchBar({ value, onChange, isScrollDown }: SearchBarProps) {
  return (
    <SearchBarWrapper>
      <SearchBarInput
        shrinked={isScrollDown}
        disabled={isScrollDown}
        value={value}
        onChange={onChange}
        placeholder="검색어를 입력해주세요."
      />
      <SearchIconBox visibility={!isScrollDown}>
        <Image src={SearchIcon} alt="Search Icon" />
      </SearchIconBox>
    </SearchBarWrapper>
  );
}
