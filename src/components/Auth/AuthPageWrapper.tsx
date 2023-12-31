import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Header } from './Header';

type AuthPageWrapperProps = {
  children: ReactNode;
};

export function AuthPageWrapper({ children }: AuthPageWrapperProps) {
  return (
    <Flex
      pb='20px'
      mx='auto'
      overflowX='hidden'
      maxW={1400}
      h='100vh'
      direction='column'
    >
      <Header />
      {children}
    </Flex>
  );
}
