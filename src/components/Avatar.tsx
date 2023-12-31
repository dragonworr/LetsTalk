import { ChakraProps, ImageProps, Skeleton, Image } from '@chakra-ui/react';
import { forwardRef, useEffect, useState } from 'react';

export type AvatarPropsWithoutSrc = Omit<ImageProps, 'src'>;

type AvatarProps = AvatarPropsWithoutSrc & {
  src: string | null | undefined;
};

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ src, width, w, h, height, ...props }, ref) => {
    const abstractUserIcon = 'images/abstract-user.svg';

    const [isLoaded, setIsLoaded] = useState(false);

    const [avatar, setAvatar] = useState('');

    useEffect(() => {
      setAvatar(src ?? abstractUserIcon);
    }, [src]);

    function handleLoad() {
      setIsLoaded(true);
    }

    function handleError() {
      setAvatar(abstractUserIcon);
      setIsLoaded(true);
    }

    const styles: ChakraProps = {
      borderRadius: '50%',
    };

    return (
      <Skeleton
        isLoaded={isLoaded || !avatar}
        startColor='gray.300'
        endColor='gray.400'
        w={w}
        width={width}
        h={h}
        height={height}
        sx={{
          '&': {
            aspectRatio: '1 / 1',
          },
        }}
        {...props}
        {...styles}
      >
        <Image
          ref={ref}
          objectFit='cover'
          onLoad={handleLoad}
          onError={handleError}
          src={avatar}
          boxShadow='sm'
          alt='Imagem de perfil'
          w='100%'
          h='100%'
          {...styles}
          {...props}
        />
      </Skeleton>
    );
  }
);

Avatar.displayName = 'Avatar';
