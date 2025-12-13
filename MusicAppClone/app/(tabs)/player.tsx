
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 24,
//     width: '100%',
//   },
//   controlBtn: {
//     marginHorizontal: 18,
//     padding: 10,
//     borderRadius: 14,
//     backgroundColor: '#553f66ff',
//     // marginBottom:11,
//   },
//   playBtn: {
//     backgroundColor: '#563451ff',
//     height:60,
//     width:70,
//   },
//   controlIcon: {
//     fontSize: 32,
//     color: '#fff',
//     textAlign: 'center',
//     marginTop:3,
//   },
// });

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

import { LinearGradient } from 'expo-linear-gradient';


const songs = [
  { title: 'qyade', artist: 'Arijit Singh', image: require('@/assets/images/qayde.jpg'), audio: require('@/assets/audio/qayade.mp3') },
  { title: 'Shiddat', artist: 'Manan Bhardwaj', image: require('@/assets/images/shiddat.jpg'), audio: require('@/assets/audio/bhakti/shiddat.mp3') },
  { title: 'Barbaadiyan', artist: 'Sachet Tabdon,Nikhita Gandhi', image: require('@/assets/images/barbaadiyaan.jpg'), audio: require('@/assets/audio/barbaadiyan.mp3') },
  { title: 'Hum Dum', artist: 'Ankit Tiwari', image: require('@/assets/images/humddumshiddat.jpg'), audio: require('@/assets/audio/humdumshiddat.mp3') },
  { title: 'Phir Chala', artist: 'Arijit Song', image: require('@/assets/images/phirchalla.jpg'), audio: require('@/assets/audio/phirchalajubinnautiyal.mp3') },
  { title: 'Jug Jug Jeeve', artist: 'Prakriti Kakar& Sachin-Jigar', image: require('@/assets/images/jugjugjeeeve.jpg'), audio: require('@/assets/audio/jugjugjeeve.mp3') },
  { title: 'Ki Honda Pyar', artist: 'Jassie Gill', image: require('@/assets/images/kihondapyarr.jpg'), audio: require('@/assets/audio/kihondapyar.mp3') },
  { title: 'Humdum', artist: 'Vishal Mishra', image: require('@/assets/images/Humdum-From-Savi-Hindi-2024-20240520191009-500x500.jpg'), audio: require('@/assets/audio/humdumharshvardhanrane.mp3') },
  { title: 'Ajao Meri Tamanna', artist: 'Javed Ali,Mou Mukherjee(Jojo)', image: require('@/assets/images/meritamanna.jpg'), audio: require('@/assets/audio/meritamanna.mp3') },
  { title: 'Tum Itna jo Muskura Rahe Ho', artist: 'Jagjit Singh', image: require('@/assets/images/tumitnajo.jpg'), audio: require('@/assets/audio/muskuraraheho.mp3') },
  { title: 'HumnavaMere', artist: 'Jubin Nautiyar', image: require('@/assets/images/humnavamere.jpg'), audio: require('@/assets/audio/humnavamerejubinnautiyal.mp3') },
  { title: 'Ishq', artist: 'Faheem Abdullah', image: require('@/assets/images/ishqfaheem.jpg'), audio: require('@/assets/audio/ishqfaheemabdullah.mp3') },
  { title: 'khayali Ishq', artist: 'Mohit chauhan', image: require('@/assets/images/khayaliishqq.jpg'), audio: require('@/assets/audio/khayaliishq.mp3') },
  { title: 'Kya Tujhe Ab Ye Dil Bataye', artist: 'Atif Aslam', image: require('@/assets/images/kyatujheab.jpg'), audio: require('@/assets/audio/kyatujhe.mp3') },
  { title: 'Tum Itna Jo Muskura Rahe ho', artist: 'Jagjit Singh', image: require('@/assets/images/tumitnajo.jpg'), audio: require('@/assets/audio/muskuraraheho.mp3') },
  { title: 'Tera chehra', artist: 'Adnan sami', image: require('@/assets/images/terachera.jpg'), audio: require('@/assets/audio/terachehrajab.mp3') },
  { title: 'Tere Dil Pe Haq Mera hai', artist: 'Vishal Mishara', image: require('@/assets/images/deewaniyat.jpg'), audio: require('@/assets/audio/teredilpehaqmerah.mp3') },
  { title: 'Tere Liye', artist: 'Atif Aslam,Shreya Ghoshal', image: require('@/assets/images/tereliyeduniyabhulai.jpg'), audio: require('@/assets/audio/tereliyeduniya.mp3') },
  { title: 'Tum Se Hi', artist: 'Ankit Tiwari', image: require('@/assets/images/tumsehialia.jpg'), audio: require('@/assets/audio/tumsehiankit.mp3') },
  { title: 'Tum Se', artist: 'Mohit Chouhan', image: require('@/assets/images/tumse.jpg'), audio: require('@/assets/audio/tumsejabwemet.mp3') },
  { title: 'Zamaana Lage', artist: 'Arijit Singh', image: require('@/assets/images/zamanalagetumhe.jpg'), audio: require('@/assets/audio/zamaanalage.mp3') },
  { title: 'Kbhi Aine Pe Liikha Tujhe', artist: 'Kk', image: require('@/assets/images/kbhiainnepelikhatujhe.jpg'), audio: require('@/assets/audio/kbhiainepelikhatujhe.mp3') },
  { title: 'Jhol', artist: 'Maanu x Annural Khalid', image: require('@/assets/images/palpaljeena.jpg'), audio: require('@/assets/audio/Jhol.mp3') },
  { title: 'Tera Mera Hai Pyar', artist: 'Ahmed Jahannzeb', image: require('@/assets/images/palpaljeena.jpg'), audio: require('@/assets/audio/teramerahaipyar.mp3') },
];

export default function PlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ startIndex?: string }>();
  const soundRef = useRef<Audio.Sound | null>(null);

  const initialIndex = params.startIndex ? parseInt(params.startIndex, 10) : 0;
  const [currentSongIndex, setCurrentSongIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const currentSong = songs[currentSongIndex];

  function formatTime(sec: number) {
    if (isNaN(sec)) {
      return '0:00';
    }
    const m = Math.floor(sec / 60); // get minutes
    const s = Math.floor(sec % 60); // get seconds
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Effect for loading and unloading the sound
  useEffect(() => {
    // Unload previous sound before loading a new one
    soundRef.current?.unloadAsync();

    async function loadSound() {
      // Configure audio session for iOS playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        currentSong.audio
      );
      soundRef.current = sound;

      // Listener for playback status updates
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
          setPosition(status.positionMillis / 1000);
          setIsPlaying(status.isPlaying);
          // Play next song when current one finishes
          if (status.didJustFinish) {
            handleNext();
          }
        }
      });
    }

    loadSound();

    // Cleanup function to unload the sound
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [currentSongIndex]); // Rerun effect when song index changes

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => {
      return (prevIndex - 1 + songs.length) % songs.length;
    });
  };

  const onPlayPausePress = async () => {
    if (!soundRef.current) {
      return;
    }

    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
    // The isPlaying state is updated by the onPlaybackStatusUpdate listener
  };

  const onSliderValueChange = (value: number) => {
    if (!isSeeking) {
      setIsSeeking(true);
    }
    setPosition(value);
  };

  const onSlidingComplete = async (value: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value * 1000);
    }
    setIsSeeking(false);
  };

  return (
     <LinearGradient
          colors={['#5f7fb2','#876482','#383e5e']} // Background gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <TouchableOpacity onPress={() => { /* Handle more options */ }}>
          <Icon name="ellipsis-h" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Circular Album Art */}
      <View style={styles.albumCircleWrap}>
        <View style={styles.albumCircleOuter}>
          <View style={styles.albumCircleInner}>
            <Image
              source={currentSong.image}
              style={styles.albumArt}
            />
            <View style={styles.albumCenterDot} />
          </View>
        </View>
      </View>
      {/* Progress Bar */}
      <View style={styles.progressRow}>
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={onSliderValueChange}
          onSlidingComplete={onSlidingComplete}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FFFFFF"
        />
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
      {/* Song Info */}
      <Text style={styles.songTitle} numberOfLines={1}>
        {currentSong.title}
      </Text>
      <Text style={styles.artistName}>{currentSong.artist}</Text>
      {/* Controls */}
      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.controlBtn} onPress={handlePrevious}>
          <Icon name="backward" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlBtn, styles.playBtn]} onPress={onPlayPausePress}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={handleNext}>
          <Icon name="forward" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#40408dff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
   gradientBackground: {
    flex: 1,},

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerIcon: {
    color: '#fff',
    fontSize: 24,
    paddingHorizontal: 10, // Add padding for easier tapping
  },
  albumCircleWrap: {
    marginTop: 30,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumCircleOuter: {
    width:300,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumCircleInner: {
  width: 290,
  height: 350,
  borderRadius: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent glass look
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)', // Soft border for glass
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  // shadowColor: '#000',
  // shadowOffset: { width: 0, height:  },s
  // shadowOpacity: 0.3,
  // shadowRadius: 4.65,
  // elevation: 8, // Android shadow
  // overflow: 'hidden', // Rounded corners
},
  albumArt: {
    width: 240,
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  albumCenterDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#78163cff',
    marginLeft: -9,
    marginTop: -9,
    borderWidth: 2,
    borderColor: '#fff',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
    marginTop: 8,
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
  },
  time: {
    color: '#bbb',
    fontSize: 13,
    width: 40,
    textAlign: 'center',
  },
  songTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  artistName: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    width: '100%',
  },
  controlBtn: {
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#553f66ff',
    // marginBottom:11,
  },
  playBtn: {
    backgroundColor: '#563451ff',
    height:60,
    width:70,
  },
  controlIcon: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginTop:3,
  },
});