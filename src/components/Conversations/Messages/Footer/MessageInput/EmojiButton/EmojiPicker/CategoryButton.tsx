import {
  Icon,
  IconButton,
  IconButtonProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

type CategoryButtonProps = {
  categoryIcon: IconType;
  index: number;
  selectedCategoryIndex: number;
} & IconButtonProps;

export function CategoryButton({
  'aria-label': ariaLabel,
  selectedCategoryIndex,
  index,
  categoryIcon,
  ...rest
}: CategoryButtonProps) {
  const color = {
    selected: useColorModeValue('blackAlpha.800', 'whiteAlpha.800'),
    default: useColorModeValue('blackAlpha.600', 'whiteAlpha.600'),
  };

  return (
    <IconButton
      color={selectedCategoryIndex === index ? color.selected : color.default}
      title={ariaLabel}
      aria-label={ariaLabel}
      variant='unstyled'
      flex='1'
      h='45px'
      fontSize='22px'
      transition='0'
      _focus={{
        boxShadow: 'none',
      }}
      d='flex'
      icon={<Icon as={categoryIcon} />}
      {...rest}
    />
  );
}
