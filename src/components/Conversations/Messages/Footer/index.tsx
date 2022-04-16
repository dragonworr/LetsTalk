import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { Divider } from '../Divider';
import { MessageInput } from './MessageInput';
import { AiFillAudio } from 'react-icons/ai';
import { Tooltip } from '../../../Tooltip';

export function Footer() {
  return (
    <Box mt='auto'>
      <Divider />
      <Flex
        as='footer'
        py={['11px', '13px', '15px']}
        minH={['50px', '65px', '80px']}
        align='center'
        justify='start'
        pl={['6px', '8px', '10px']}
      >
        <MessageInput />
        <Tooltip
          hasArrow={false}
          ariaLabel='Gravar áudio'
          label='Gravar áudio'
          placement='top'
        >
          <IconButton
            flexShrink={0}
            fontSize={['18px', '20px', '22px']}
            w={['39px', '42px', '45px']}
            h={['39px', '42px', '45px']}
            borderRadius={['11px', '13px', '15px']}
            ml={['11px', '13px', '15px']}
            color='white'
            bg='blue.900'
            aria-label='Gravar áudio'
            icon={<Icon as={AiFillAudio} />}
            _hover={{
              bg: 'blue.900',
            }}
            _active={{
              bg: 'blueAlpha.900',
            }}
          />
        </Tooltip>
      </Flex>
    </Box>
  );
}
