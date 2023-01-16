import type { AppProps } from 'next/app';

import { QueryClientProvider, QueryClient } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import CheckSignInStatus from '@components/auth/CheckSignInStatus';
import GlobalStyle from '@styles/GlobalStyle';
import responsive from '@styles/responsive';

import '@styles/font.css';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CheckSignInStatus>
          <GlobalStyle />
          <ThemeProvider theme={responsive}>
            <Component {...pageProps} />
            <ToastContainer limit={3} />
          </ThemeProvider>
        </CheckSignInStatus>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
