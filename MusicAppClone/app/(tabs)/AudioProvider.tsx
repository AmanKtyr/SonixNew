import React, { createContext, useState, useRef, useEffect, useContext, ReactNode } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';

export const songs = [
	{ title: 'qyade', artist: 'Arijit Singh', image: require('@/assets/images/qayde.jpg'), audio: require('@/assets/audio/qayade.mp3'), category: 'romantic' },
	{ title: 'Shiddat', artist: 'Manan Bhardwaj', image: require('@/assets/images/shiddat.jpg'), audio: require('@/assets/audio/bhakti/shiddat.mp3'), category: 'romantic' },
	{ title: 'Barbaadiyan', artist: 'Sachet Tabdon,Nikhita Gandhi', image: require('@/assets/images/barbaadiyaan.jpg'), audio: require('@/assets/audio/barbaadiyan.mp3'), category: 'party' },
	{ title: 'Hum Dum', artist: 'Ankit Tiwari', image: require('@/assets/images/humddumshiddat.jpg'), audio: require('@/assets/audio/humdumshiddat.mp3'), category: 'romantic' },
	{ title: 'Phir Chala', artist: 'Arijit Song', image: require('@/assets/images/phirchalla.jpg'), audio: require('@/assets/audio/phirchalajubinnautiyal.mp3'), category: 'sad' },
	{ title: 'Jug Jug Jeeve', artist: 'Prakriti Kakar& Sachin-Jigar', image: require('@/assets/images/jugjugjeeeve.jpg'), audio: require('@/assets/audio/jugjugjeeve.mp3'), category: 'bhakti' },
	{ title: 'Ki Honda Pyar', artist: 'Jassie Gill', image: require('@/assets/images/kihondapyarr.jpg'), audio: require('@/assets/audio/kihondapyar.mp3'), category: 'sad' },
	{ title: 'Humdum', artist: 'Vishal Mishra', image: require('@/assets/images/Humdum-From-Savi-Hindi-2024-20240520191009-500x500.jpg'), audio: require('@/assets/audio/humdumharshvardhanrane.mp3'), category: 'romantic' },
	{ title: 'Ajao Meri Tamanna', artist: 'Javed Ali,Mou Mukherjee(Jojo)', image: require('@/assets/images/meritamanna.jpg'), audio: require('@/assets/audio/meritamanna.mp3'), category: 'romantic' },
	{ title: 'Tum Itna jo Muskura Rahe Ho', artist: 'Jagjit Singh', image: require('@/assets/images/tumitnajo.jpg'), audio: require('@/assets/audio/muskuraraheho.mp3'), category: 'bhakti' },
	{ title: 'HumnavaMere', artist: 'Jubin Nautiyar', image: require('@/assets/images/humnavamere.jpg'), audio: require('@/assets/audio/humnavamerejubinnautiyal.mp3'), category: 'bhakti' },
	{ title: 'Ishq', artist: 'Faheem Abdullah', image: require('@/assets/images/ishqfaheem.jpg'), audio: require('@/assets/audio/ishqfaheemabdullah.mp3'), category: 'sufi' },
	{ title: 'khayali Ishq', artist: 'Mohit chauhan', image: require('@/assets/images/khayaliishqq.jpg'), audio: require('@/assets/audio/khayaliishq.mp3'), category: 'romantic' },
	{ title: 'Kya Tujhe Ab Ye Dil Bataye', artist: 'Atif Aslam', image: require('@/assets/images/kyatujheab.jpg'), audio: require('@/assets/audio/kyatujhe.mp3'), category: 'sad' },
	{ title: 'Tum Itna Jo Muskura Rahe ho', artist: 'Jagjit Singh', image: require('@/assets/images/tumitnajo.jpg'), audio: require('@/assets/audio/muskuraraheho.mp3'), category: 'gazal' },
	{ title: 'Tera chehra', artist: 'Adnan sami', image: require('@/assets/images/terachera.jpg'), audio: require('@/assets/audio/terachehrajab.mp3'), category: 'romantic' },
	{ title: 'Tere Dil Pe Haq Mera hai', artist: 'Vishal Mishara', image: require('@/assets/images/deewaniyat.jpg'), audio: require('@/assets/audio/teredilpehaqmerah.mp3'), category: 'romantic' },
	{ title: 'Tere Liye', artist: 'Atif Aslam,Shreya Ghoshal', image: require('@/assets/images/tereliyeduniyabhulai.jpg'), audio: require('@/assets/audio/tereliyeduniya.mp3'), category: 'sad' },
	{ title: 'Tum Se Hi', artist: 'Ankit Tiwari', image: require('@/assets/images/tumsehialia.jpg'), audio: require('@/assets/audio/tumsehiankit.mp3'), category: 'romantic' },
	{ title: 'Tum Se', artist: 'Mohit Chouhan', image: require('@/assets/images/tumse.jpg'), audio: require('@/assets/audio/tumsejabwemet.mp3'), category: 'romantic' },
	{ title: 'Zamaana Lage', artist: 'Arijit Singh', image: require('@/assets/images/zamanalagetumhe.jpg'), audio: require('@/assets/audio/zamaanalage.mp3'), category: 'romantic' },
	{ title: 'Kbhi Aine Pe Liikha Tujhe', artist: 'Kk', image: require('@/assets/images/kbhiainnepelikhatujhe.jpg'), audio: require('@/assets/audio/kbhiainepelikhatujhe.mp3'), category: 'romantic' },
	{ title: 'Jhol', artist: 'Maanu x Annural Khalid', image: require('@/assets/images/jholpic.jpg'), audio: require('@/assets/audio/Jhol.mp3'), category: 'english' },
	{ title: 'Tera Mera Hai Pyar', artist: 'Ahmed Jahannzeb', image: require('@/assets/images/teramerahaipyaramar.jpg'), audio: require('@/assets/audio/teramerahaipyar.mp3'), category: 'romantic' },
	{ title: 'Pal Pal', artist: 'AliSoomro', image: require('@/assets/images/palpaljeena.jpg'), audio: require('@/assets/audio/palpal.mp3'), category: 'english' },

];

export type Song = (typeof songs)[0];

interface AudioContextType {
	songs: Song[];
	currentSong: Song | null;
	currentSongIndex: number | null;
	isPlaying: boolean;
	playbackStatus: AVPlaybackStatus | null;
	playSong: (index: number) => void;
	togglePlayPause: () => void;
	seek: (position: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
	const soundRef = useRef<Audio.Sound | null>(null);
	const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus | null>(null);

	useEffect(() => {
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			playsInSilentModeIOS: true,
		});
		return () => {
			soundRef.current?.unloadAsync();
		}
	}, []);

	const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
		setPlaybackStatus(status);
		if (status.isLoaded) {
			setIsPlaying(status.isPlaying);
			if (status.didJustFinish && currentSongIndex !== null) {
				playSong((currentSongIndex + 1) % songs.length);
			}
		}
	}
	const playSong = async (index: number) => {
		if (soundRef.current) {
			const status = await soundRef.current.getStatusAsync();
			if (status.isLoaded && index === currentSongIndex) {
				togglePlayPause();
				return;
			}
			await soundRef.current.unloadAsync();
			soundRef.current.setOnPlaybackStatusUpdate(null);
		}

		const song = songs[index];
		const { sound } = await Audio.Sound.createAsync(song.audio, { shouldPlay: true });
		soundRef.current = sound;
		setCurrentSongIndex(index);
		sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
	};

	const togglePlayPause = async () => {
		if (!soundRef.current) return;
		if (isPlaying) {
			await soundRef.current.pauseAsync();
		} else {
			await soundRef.current.playAsync();
		}
	};

	const seek = async (position: number) => {
		if (!soundRef.current) return;
		await soundRef.current.setPositionAsync(position);
	}

	const value = {
		songs,
		currentSong: currentSongIndex !== null ? songs[currentSongIndex] : null,
		currentSongIndex,
		isPlaying,
		playbackStatus,
		playSong,
		togglePlayPause,
		seek,
	};

	return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
	const context = useContext(AudioContext);
	if (context === undefined) {
		throw new Error('useAudio must be used within an AudioProvider');
	}
	return context;
};