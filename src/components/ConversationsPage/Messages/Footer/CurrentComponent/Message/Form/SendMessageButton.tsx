import { useSetMessageInputSize } from 'hooks/useSetMessageInputSize';
import { useEffect } from 'react';
import { SetMessage } from '.';
import { Base } from '../../RightButtonBase/Send/Base';

type SendMessageButtonProps = {
  setMessage: SetMessage;
};

export function SendMessageButton({ setMessage }: SendMessageButtonProps) {
  const { setMessageInputSize } = useSetMessageInputSize();

  function handleSendMessage() {
    setMessage('');
  }

  useEffect(() => {
    return () => {
      setMessageInputSize();
    };
  }, [setMessageInputSize]);

  return <Base onClick={handleSendMessage} label='Enviar mensagem' />;
}
