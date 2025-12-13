// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { useAudio } from './(tabs)/AudioProvider';
// import { Ionicons } from '@expo/vector-icons';
// import Slider from '@react-native-community/slider';

// export default function PlayerScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams<{ startIndex?: string }>();
//   const {
//     songs,
//     currentSong,
//     currentSongIndex,
//     isPlaying,
//     playbackStatus,
//     playSong,
//     togglePlayPause,
//     seek,
//   } = useAudio();

//   useEffect(() => {
//     const startIndex = params.startIndex ? parseInt(params.startIndex, 10) : null;
//     if (startIndex !== null && startIndex !== currentSongIndex) {
//       playSong(startIndex);
//     }
//   }, [params.startIndex]);

//   const handleNext = () => {
//     if (currentSongIndex !== null) {
//       playSong((currentSongIndex + 1) % songs.length);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentSongIndex !== null) {
//       playSong((currentSongIndex - 1 + songs.length) % songs.length);
//     }
//   };

//   function formatTime(millis: number) {
//     if (isNaN(millis) || millis < 0) return '0:00';
//     const totalSeconds = Math.floor(millis / 1000);
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   }

//   if (!currentSong || !playbackStatus?.isLoaded) {
//     return (
//       <View style={[styles.container, { justifyContent: 'center' }]}>
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={styles.loadingText}>Loading Song...</Text>
//       </View>
//     );
//   }

//   const positionMillis = playbackStatus.positionMillis;
//   const durationMillis = playbackStatus.durationMillis ?? 0;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="chevron-down" size={28} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Now Playing</Text>
//         <TouchableOpacity onPress={() => { /* More options */ }}>
//           <Ionicons name="ellipsis-horizontal" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <Image source={currentSong.image} style={styles.albumArt} />

//       <View style={styles.songInfoContainer}>
//         <Text style={styles.songTitle} numberOfLines={1}>{currentSong.title}</Text>
//         <Text style={styles.artistName}>{currentSong.artist}</Text>
//       </View>

     
//       <View style={styles.progressRow}>
//         <Text style={styles.time}>{formatTime(positionMillis)}</Text>
//         <Text style={styles.time}>{formatTime(durationMillis)}</Text>
//       </View>

//       <View style={styles.controlsRow}>
//         <TouchableOpacity onPress={handlePrevious}>
//           <Ionicons name="play-skip-back" size={40} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.playBtn} onPress={togglePlayPause}>
//           <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleNext}>
//           <Ionicons name="play-skip-forward" size={40} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
//   loadingText: { color: 'white', marginTop: 10, fontSize: 16 },
//   header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
//   headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   albumArt: { width: 300, height: 300, borderRadius: 12, marginBottom: 40 },
//   songInfoContainer: { width: '100%', alignItems: 'flex-start', marginBottom: 10 },
//   songTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
//   artistName: { color: '#bbb', fontSize: 18 },
//   slider: { width: '100%', height: 40 },
//   progressRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
//   time: { color: '#bbb', fontSize: 13 },
//   controlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '80%', marginTop: 40 },
//   playBtn: { backgroundColor: 'white', width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
// });