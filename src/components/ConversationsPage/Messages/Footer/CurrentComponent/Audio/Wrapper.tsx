import { Flex, FlexProps } from '@chakra-ui/react';

type WrapperProps = FlexProps;

export function Wrapper({ children, ...rest }: WrapperProps) {
  return (
    <Flex
      align='center'
      justify='end'
      flex='1'
      gap={['.9rem', '1.25rem']}
      {...rest}
      sx={{
        'button:last-child': {
          ml: 0,
        },
      }}
    >
      {children}
    </Flex>
  );
}
