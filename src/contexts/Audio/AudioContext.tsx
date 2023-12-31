import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  handler,
  iterateEvents,
  IterateEventsWithoutTarget,
} from 'utils/iterateEvents';
import { AudioPlaying, useAudiosPlaying } from './AudiosPlaying';

export const h = handler<HTMLMediaElementEventMap>();

type Audio = {
  index: number;
  element: HTMLAudioElement;
} | null;

type SetIsPlaying = (isPlaying: boolean) => void;

type AudioProviderProps = {
  children: ReactNode;
};

type AudioContextType = {
  audio: Audio;
  setAudio: Dispatch<SetStateAction<Audio>>;
  iterateAudioEvents: IterateEventsWithoutTarget;
  isPlaying: AudioPlaying;
  setIsPlaying: SetIsPlaying;
};

export const AudioContext = createContext({} as AudioContextType);

export function AudioProvider({ children }: AudioProviderProps) {
  const [audio, setAudio] = useState<Audio>(null);

  const { audiosPlaying, setAudiosPlaying } = useAudiosPlaying();

  const index = audio?.index ?? 0;

  const isPlaying = audiosPlaying[index];

  const setIsPlaying: SetIsPlaying = useCallback(
    (isPlaying) => {
      const newAudiosPlaying = audiosPlaying.map((_, i) => {
        if (index !== i) return false;

        return isPlaying;
      });

      setAudiosPlaying(newAudiosPlaying);
    },
    [audiosPlaying, index, setAudiosPlaying]
  );

  const iterateAudioEvents: IterateEventsWithoutTarget = (...params) => {
    if (audio?.element === undefined) return;

    iterateEvents(...params, audio?.element);
  };

  return (
    <AudioContext.Provider
      value={{ audio, setAudio, iterateAudioEvents, isPlaying, setIsPlaying }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const data = useContext(AudioContext);

  return data;
}
