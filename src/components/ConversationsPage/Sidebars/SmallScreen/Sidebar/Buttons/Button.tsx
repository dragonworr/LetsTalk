import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { Tooltip } from 'components/Tooltip';
import { useFontSizeBasedOnMeasurement } from 'hooks/useFontSizeBasedOnMeasurement';
import { useRef } from 'react';

type ButtonProps = {
  isSelected?: boolean;
} & IconButtonProps;

export function Button({
  isSelected,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const { fontSize } = useFontSizeBasedOnMeasurement(ref, 1.5);

  return (
    <Tooltip ariaLabel={ariaLabel} label={ariaLabel} aria-label={ariaLabel}>
      <ChakraIconButton
        ref={ref}
        bg={isSelected ? 'whiteAlpha.400' : undefined}
        h='60%'
        sx={{
          aspectRatio: '1 / 1',
        }}
        fontSize={fontSize}
        d='flex'
        justifyContent='center'
        alignItems='center'
        color='white'
        minW='0'
        variant='ghost'
        _hover={{
          bg: 'whiteAlpha.400',
        }}
        _active={{
          bg: 'whiteAlpha.500',
        }}
        aria-label={ariaLabel}
        {...rest}
      />
    </Tooltip>
  );
}