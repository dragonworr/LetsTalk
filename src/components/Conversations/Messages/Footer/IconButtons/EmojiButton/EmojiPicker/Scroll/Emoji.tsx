import { Center } from '@chakra-ui/react';
import { memo, MouseEvent } from 'react';
import { useMessageInputRef } from '../../../../../../../../contexts/MessageInputRef';

type EmojiProps = {
  emoji: string;
};

export const size = [36, 41, 46];
const measure = size.map((size) => size + 'px');

function EmojiComponent({ emoji }: EmojiProps) {
  const { ref: messageInputRef } = useMessageInputRef();

  // const {
  //   categories: { setState: setCategories, data: categories },
  // } = useEmoji();

  // function handleAddEmojiInRecentCategory() {
  //   const categoriesData = [...categories.data];

  //   const recentCategoryExists = categoriesData[0].name === 'Recentes';

  //   if (!recentCategoryExists) {
  //     const addCategory = () => {
  //       const category = createRecentCategory();

  //       categoriesData.unshift(category);
  //     };

  //     addCategory();
  //   }

  //   const category = categoriesData[0];

  //   const emojiExists = category.emojis.includes(emoji);

  //   if (emojiExists) {
  //     // it will remove the existing emoji
  //     const emojis = category.emojis.filter(
  //       (categoryEmoji) => categoryEmoji !== emoji
  //     );

  //     // it will add the emoji in the first position
  //     emojis.unshift(emoji);

  //     category.emojis = emojis;
  //   } else {
  //     if (category.emojis.length === 25) {
  //       category.emojis.pop();
  //     }

  //     category.emojis.unshift(emoji);
  //   }

  //   localStorage.setItem('recentlyUsedEmojis', JSON.stringify(category.emojis));

  //   // setCategories((prevState) => ({
  //   //   ...prevState,
  //   //   data: categoriesData,
  //   // }));
  // }

  function handleInsertEmoji() {
    const input = messageInputRef.current;

    const isFocused = document.activeElement === input;

    if (!isFocused) input?.focus();

    const [start, end] = [
      input?.selectionStart,
      input?.selectionEnd,
    ] as number[];

    input?.setRangeText(emoji, start, end, 'end');

    function handleInputSize() {
      input?.dispatchEvent(new Event('change', { bubbles: true }));
    }

    handleInputSize();
  }

  function handleDisableFocusOnClick(e: MouseEvent) {
    e.preventDefault();
  }

  return (
    <Center
      onMouseDown={handleDisableFocusOnClick}
      onClick={() => {
        handleInsertEmoji();
        // handleAddEmojiInRecentCategory();
      }}
      as='li'
      fontSize={['22px', '25px', '28px']}
      w={measure}
      h={measure}
      cursor='pointer'
      borderRadius='8px'
      _hover={{
        bgColor: 'whiteAlpha.400',
      }}
    >
      {emoji}
    </Center>
  );
}

export const Emoji = memo(EmojiComponent);