import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { songs as allSongs, Song } from './(tabs)/AudioProvider';

interface LibraryContextType {
  likedSongs: Song[];
  toggleLike: (song: Song) => void;
  isLiked: (song: Song) => boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [likedSongTitles, setLikedSongTitles] = useState<string[]>([]);

  useEffect(() => {
    const loadLikedSongs = async () => {
      try {
        const storedLikedSongs = await AsyncStorage.getItem('likedSongs');
        if (storedLikedSongs) {
          setLikedSongTitles(JSON.parse(storedLikedSongs));
        }
      } catch (e) {
        console.error('Failed to load liked songs.', e);
      }
    };
    loadLikedSongs();
  }, []);

  const toggleLike = async (song: Song) => {
    const songTitle = song.title;
    const newLikedSongTitles = likedSongTitles.includes(songTitle)
      ? likedSongTitles.filter(title => title !== songTitle)
      : [...likedSongTitles, songTitle];
    
    setLikedSongTitles(newLikedSongTitles);
    try {
      await AsyncStorage.setItem('likedSongs', JSON.stringify(newLikedSongTitles));
    } catch (e) {
      console.error('Failed to save liked songs.', e);
    }
  };

  const isLiked = (song: Song) => {
    return likedSongTitles.includes(song.title);
  };

  const likedSongs = allSongs.filter(song => likedSongTitles.includes(song.title));

  const value = {
    likedSongs,
    toggleLike,
    isLiked,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};