import { useState, useRef, useEffect } from 'react';

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  duration: number;
  currentTime: number;
}

export const useAudioPlayer = (audioSrc: string = '/audio/background-music.mp3'): UseAudioPlayerReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Event listeners
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    // Mobile-specific: Handle audio interruptions
    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Mobile browsers require user interaction for audio
        audioRef.current.play().catch((error) => {
          console.log('Audio play failed:', error);
          // Silently handle autoplay restrictions
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  return {
    isPlaying,
    togglePlay,
    volume,
    setVolume: handleVolumeChange,
    duration,
    currentTime,
  };
};

export default useAudioPlayer;