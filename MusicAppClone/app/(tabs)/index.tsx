import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { songs } from './AudioProvider';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;
const CARD_MARGIN = 15;

type PlaylistItem = { 
  title: string; 
  image: any; 
  songIndex?: number; 
  category?: string 
};

import { playlists, artists, recentlyPlayed } from './data';

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = (item: PlaylistItem) => {
    if (item.category) {
      router.push({ pathname: '/(tabs)/player', params: { category: item.category } });
    } else if (item.songIndex !== undefined) {
      router.push({ pathname: '/(tabs)/player', params: { startIndex: item.songIndex } });
    }
  };

  const handleArtistPress = (artistName: string) => {
    const songIndex = songs.findIndex((song) => song.artist === artistName);
    if (songIndex !== -1) {
      router.push({ pathname: '/(tabs)/player', params: { startIndex: songIndex } });
    } else {
      console.warn(`No songs found for artist: ${artistName}`);
    }
  };

  const renderPlaylistItem = ({ item }: { item: PlaylistItem }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => handlePress(item)}>
      <Image source={item.image} style={styles.gridImage} />
      <Text style={styles.gridTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderArtistItem = ({ item }: { item: { name: string, image: any } }) => (
    <TouchableOpacity style={styles.artistItem} onPress={() => handleArtistPress(item.name)}>
      <Image source={item.image} style={styles.artistImage} />
      <Text style={styles.artistName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRecentItem = ({ item }: { item: { title: string, artist: string, image: any, songIndex: number } }) => (
    <TouchableOpacity style={styles.recentItem} onPress={() => router.push({ pathname: '/(tabs)/player', params: { startIndex: item.songIndex } })}>
      <Image source={item.image} style={styles.recentImage} />
      <View style={styles.recentTextContainer}>
        <Text style={styles.recentTitle}>{item.title}</Text>
        <Text style={styles.recentArtist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#1e1e1e', '#2d3436', '#2c3e50']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good evening</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
            <Ionicons name="search-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Section title="Playlists">
          <FlatList
            data={playlists}
            renderItem={renderPlaylistItem}
            keyExtractor={(item) => item.title}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            scrollEnabled={false}
          />
        </Section>

        <Section title="Recently Played">
          <FlatList
            data={recentlyPlayed}
            renderItem={renderRecentItem}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: CARD_MARGIN }}
          />
        </Section>

        <Section title="Your Top Artists">
          <FlatList
            data={artists}
            renderItem={renderArtistItem}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: CARD_MARGIN }}
          />
        </Section>
      </ScrollView>
    </LinearGradient>
  );
}

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 40,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  gridItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    padding: 10,
  },
  gridImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  gridTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  artistItem: {
    alignItems: 'center',
    marginRight: CARD_MARGIN,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  artistName: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },
  recentItem: {
    width: CARD_WIDTH,
    marginRight: CARD_MARGIN,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recentImage: {
    width: '100%',
    height: 120,
  },
  recentTextContainer: {
    padding: 10,
  },
  recentTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentArtist: {
    color: '#bbb',
    fontSize: 12,
    marginTop: 4,
  },
});