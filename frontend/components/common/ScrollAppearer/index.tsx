import { ScrollAppearerWrapper, ScrollAppearerTarget } from './styled';

interface ScrollAppearerProps {
  children: React.ReactNode;
  isScrollDown: boolean;
  height: string;
}

export default function ScrollAppearer({ children, isScrollDown, height }: ScrollAppearerProps) {
  return (
    <ScrollAppearerWrapper height={height}>
      <ScrollAppearerTarget isscrolldown={isScrollDown ? 'true' : 'false'} height={height}>
        {children}
      </ScrollAppearerTarget>
    </ScrollAppearerWrapper>
  );
}
