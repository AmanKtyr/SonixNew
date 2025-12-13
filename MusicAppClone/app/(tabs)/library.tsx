import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Image, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  TextInput,
  ActivityIndicator,
  Animated,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { songs, useAudio, Song } from './AudioProvider';
import { BlurView } from 'expo-blur';

// Get unique categories from songs and capitalize them
const CATEGORIES = ['All', ...new Set(songs.map(song => 
  song.category.charAt(0).toUpperCase() + song.category.slice(1)
))];

export default function LibraryScreen() {
  const router = useRouter();
  const { playSong, togglePlayPause, isPlaying, currentSongIndex } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  // Filter songs based on search query and category
  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      const matchesSearch = 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || song.category === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handlePlayPress = async (index: number) => {
    try {
      setIsLoading(true);
      if (index === currentSongIndex) {
        await togglePlayPause();
      } else {
        await playSong(index);
      }
    } catch (error) {
      console.error('Error playing song:', error);
      // You can add error handling UI here if needed
    } finally {
      setIsLoading(false);
    }
  };

  const renderSongItem = (song: Song, index: number) => (
    <Animated.View 
      key={index} 
      style={[styles.songItem, { 
        transform: [{ scale: isPlaying && currentSongIndex === index ? 1.02 : 1 }] 
      }]}
    >
      <TouchableOpacity 
        style={styles.songTouchable} 
        onPress={() => router.push({ pathname: '/(tabs)/player', params: { startIndex: index } })}
      >
        <Image source={song.image} style={styles.songImage} />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
          <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
          {song.category && (
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{song.category}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.playButton} 
        onPress={() => handlePlayPress(index)}
        disabled={isLoading}
      >
        {isLoading && currentSongIndex === index ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Ionicons 
            name={isPlaying && currentSongIndex === index ? 'pause-circle' : 'play-circle'} 
            size={32} 
            color="#fff" 
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#1e1e1e', '#2d3436', '#2c3e50']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {Platform.OS === 'ios' ? (
          <BlurView intensity={80} style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Library</Text>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search songs or artists..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={20} color="#999" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </BlurView>
        ) : (
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Library</Text>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search songs or artists..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={20} color="#999" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}

        <View style={styles.categoriesWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    isSelected && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    isSelected && styles.categoryButtonTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView 
          style={styles.songsContainer} 
          contentContainerStyle={styles.songsContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredSongs.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="musical-notes-outline" size={64} color="#666" />
              <Text style={styles.emptyStateText}>No songs found</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your search or category</Text>
            </View>
          ) : (
            filteredSongs.map((song, index) => renderSongItem(song, index))
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  categoriesWrapper: {
    marginTop: 10,
  },
  categoriesContainer: {
    maxHeight: 60,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  categoryButtonActive: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryButtonText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  songsContainer: {
    flex: 1,
    marginTop: 10,
  },
  songsContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  songTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  songInfo: {
    flex: 1,
    paddingRight: 10,
  },
  songTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  songArtist: {
    color: '#bbb',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  playButton: {
    padding: 6,
    marginLeft: 8,
    borderRadius: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    color: '#888',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});