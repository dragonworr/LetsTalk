import {
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Slider as ChakraSlider,
} from '@chakra-ui/react';

export function Slider() {
  return (
    <ChakraSlider aria-label='Barra de progresso do áudio' defaultValue={0}>
      <SliderTrack bg='whiteAlpha.400'>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </ChakraSlider>
  );
}