import ScrollAppearer from '@components/common/ScrollAppearer';

import SearchInputWrapper from './styled';

interface SearchInputsProps {
  children: React.ReactNode;
  isScrollDown: boolean;
}

export default function SearchInputs({ children, isScrollDown }: SearchInputsProps) {
  return (
    <SearchInputWrapper>
      <ScrollAppearer height="115px" isScrollDown={isScrollDown}>
        {children}
      </ScrollAppearer>
    </SearchInputWrapper>
  );
}
