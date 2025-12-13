import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  TextInput, 
  Dimensions,
  StatusBar 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useSettings } from '../settingContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Playlist data with music-related images
const playlists = [
  {
    title: 'Chill Vibes',
    artists: 'Riz Ahmed, Jay Sean',
    image: require('@/assets/images/barbaadiyaan.jpg'), // Replace with your chill playlist image
  },
  {
    title: 'Deep Reverence',
    artists: 'Bid Sean, Nipsey Hussle',
    image: require('@/assets/images/barbaadiyaan.jpg'), // Replace with your hip-hop playlist image
  },
  {
    title: 'Summer Hits',
    artists: 'A$AP Rocky, Drake',
    image: require('@/assets/images/barbaadiyaan.jpg'), // Replace with your summer playlist image
  },
  {
    title: 'Workout Mix',
    artists: 'Eminem, Kanye West',
    image: require('@/assets/images/barbaadiyaan.jpg'), // Replace with your workout playlist image
  },
  {
    title: 'Late Night Drives',
    artists: 'The Weeknd, Post Malone',
    image: require('@/assets/images/barbaadiyaan.jpg'), // Replace with your driving playlist image
  },
  {
    title: 'Throwback Classics',
    artists: 'Michael Jackson, Madonna',
    image: require('@/assets/images/barbaadiyaan.jpg'), // Replace with your classics playlist image
  },
];

// Fallback images in case the above images are not available
const fallbackImages = [
  require('@/assets/images/partial-react-logo.png'),
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/splash-icon.png'),
];

export default function ProfileScreen() {
  const { theme } = useSettings();
  const styles = useMemo(() => dynamicStyles(theme), [theme]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('Swati Patel');
  const [tempName, setTempName] = useState(name);
  const [stats, setStats] = useState('8 Followers | 32 Following');
  const [tempStats, setTempStats] = useState(stats);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [tempImageUri, setTempImageUri] = useState<string | null>(null);
  const [showAllPlaylists, setShowAllPlaylists] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 400;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setTempImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setName(tempName);
    setStats(tempStats);
    setImageUri(tempImageUri);
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setTempName(name);
    setTempStats(stats);
    setTempImageUri(imageUri);
    setModalVisible(true);
  };

  // Get playlist image with fallback
  const getPlaylistImage = (index: number) => {
    try {
      return playlists[index].image;
    } catch {
      return fallbackImages[index % fallbackImages.length];
    }
  };

  const displayedPlaylists = showAllPlaylists ? playlists : playlists.slice(0, 4);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#0c0c0c', '#1a1a1a', '#2d1b69']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity onPress={handleOpenModal} style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* User Info Section */}
          <View style={[styles.profileSection, isSmallScreen && styles.profileSectionSmall]}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarText}>
                    {name.split(' ').map(n => n[0]).join('')}
                  </Text>
                )}
                <View style={styles.onlineIndicator} />
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userStats}>{stats}</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>24</Text>
                  <Text style={styles.statLabel}>Playlists</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>128</Text>
                  <Text style={styles.statLabel}>Likes</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>1.2K</Text>
                  <Text style={styles.statLabel}>Plays</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Playlists Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Playlists</Text>
              {playlists.length > 4 && (
                <TouchableOpacity 
                  onPress={() => setShowAllPlaylists(!showAllPlaylists)}
                  style={styles.viewAllButton}
                >
                  <Text style={styles.viewAllText}>
                    {showAllPlaylists ? 'Show Less' : `View All (${playlists.length})`}
                  </Text>
                  <Ionicons 
                    name={showAllPlaylists ? 'chevron-up' : 'chevron-down'} 
                    size={16} 
                    color="#1db954" 
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.playlistsGrid}>
              {displayedPlaylists.map((playlist, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={styles.playlistCard}
                  activeOpacity={0.8}
                >
                  <Image 
                    source={getPlaylistImage(idx)} 
                    style={styles.playlistImage} 
                    defaultSource={fallbackImages[0]}
                  />
                  <View style={styles.playlistInfo}>
                    <Text style={styles.playlistTitle} numberOfLines={1}>
                      {playlist.title}
                    </Text>
                    <Text style={styles.playlistArtists} numberOfLines={1}>
                      {playlist.artists}
                    </Text>
                    <View style={styles.playlistStats}>
                      <Ionicons name="musical-notes" size={12} color="#666" />
                      <Text style={styles.playlistSongs}>24 songs</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.moreButton}>
                    <Ionicons name="ellipsis-horizontal" size={18} color="#666" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recently Played */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Played</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.recentlyPlayedContainer}
              contentContainerStyle={styles.recentlyPlayedContent}
            >
              {playlists.slice(0, 3).map((playlist, idx) => (
                <TouchableOpacity key={idx} style={styles.recentItem}>
                  <Image 
                    source={getPlaylistImage(idx)} 
                    style={styles.recentImage}
                    defaultSource={fallbackImages[0]}
                  />
                  <Text style={styles.recentTitle} numberOfLines={1}>
                    {playlist.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Settings Menu */}
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>Account</Text>
            <MenuItem 
              icon="download-outline" 
              label="Downloads" 
              onPress={() => {}} 
              styles={styles} 
            />
            <MenuItem 
              icon="time-outline" 
              label="Listening History" 
              onPress={() => {}} 
              styles={styles} 
            />
            <MenuItem 
              icon="settings-outline" 
              label="Settings" 
              onPress={() => router.push('/setting')} 
              styles={styles} 
            />
            <MenuItem 
              icon="help-circle-outline" 
              label="Help & Feedback" 
              onPress={() => {}} 
              styles={styles} 
            />
            <MenuItem 
              icon="log-out-outline" 
              label="Sign Out" 
              onPress={() => {}} 
              styles={styles} 
              isDestructive
            />
          </View>
        </ScrollView>

        {/* Edit Profile Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={pickImage} style={styles.modalAvatarContainer}>
                <View style={styles.modalAvatarCircle}>
                  {tempImageUri ? (
                    <Image source={{ uri: tempImageUri }} style={styles.modalAvatarImage} />
                  ) : (
                    <Text style={styles.modalAvatarText}>
                      {tempName.split(' ').map(n => n[0]).join('')}
                    </Text>
                  )}
                  <View style={styles.cameraIcon}>
                    <Ionicons name="camera" size={20} color="#fff" />
                  </View>
                </View>
                <Text style={styles.changePhotoButtonText}>Change Photo</Text>
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Display Name</Text>
                <TextInput
                  style={styles.input}
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Enter your name"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Bio</Text>
                <TextInput
                  style={[styles.input, styles.bioInput]}
                  value={tempStats}
                  onChangeText={setTempStats}
                  placeholder="Describe yourself"
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
}

function MenuItem({ icon, label, onPress, styles, isDestructive = false }: { 
  icon: string; 
  label: string; 
  onPress?: () => void; 
  styles: any;
  isDestructive?: boolean;
}) {
  const iconColor = isDestructive ? '#ff4444' : styles.menuIcon.color;
  
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon as any} size={22} color={iconColor} />
      </View>
      <Text style={[styles.menuLabel, isDestructive && styles.destructiveText]}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={iconColor} />
    </TouchableOpacity>
  );
}

const dynamicStyles = (theme: 'light' | 'dark') => {
  // Force dark mode styling
  const isDarkMode = true; // Always dark mode
  const colors = {
    background: 'transparent',
    text: '#ffffff',
    subtext: '#aaaaaa',
    card: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.15)',
    primary: '#1db954',
    secondary: '#bb86fc',
    modalOverlay: 'rgba(0,0,0,0.8)',
    modalContent: '#1a1a1a',
    inputBackground: 'rgba(255,255,255,0.1)',
    destructive: '#ff4444',
  };

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
      marginTop: 50,
    },
    headerTitle: {
      color: colors.text,
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: -0.5,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    editButtonText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 6,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 40,
    },
    profileSectionSmall: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    avatarContainer: {
      marginRight: 20,
      position: 'relative',
    },
    avatarCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.inputBackground,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: colors.primary,
      position: 'relative',
    },
    avatarImage: {
      width: 94,
      height: 94,
      borderRadius: 47,
    },
    avatarText: {
      color: colors.text,
      fontSize: 32,
      fontWeight: 'bold',
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 6,
      right: 6,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.primary,
      borderWidth: 2,
      borderColor: colors.modalContent,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      color: colors.text,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    userStats: {
      color: colors.subtext,
      fontSize: 14,
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      gap: 20,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    statLabel: {
      color: colors.subtext,
      fontSize: 12,
      marginTop: 2,
    },
    section: {
      marginBottom: 30,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: 'bold',
    },
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      gap: 4,
    },
    viewAllText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    playlistsGrid: {
      gap: 12,
    },
    playlistCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    playlistImage: {
      width: 60,
      height: 60,
      borderRadius: 12,
      marginRight: 16,
    },
    playlistInfo: {
      flex: 1,
    },
    playlistTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    playlistArtists: {
      color: colors.subtext,
      fontSize: 14,
      marginBottom: 6,
    },
    playlistStats: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    playlistSongs: {
      color: '#666',
      fontSize: 12,
    },
    moreButton: {
      padding: 8,
    },
    recentlyPlayedContainer: {
      marginHorizontal: -5,
    },
    recentlyPlayedContent: {
      paddingHorizontal: 5,
      gap: 12,
    },
    recentItem: {
      width: 120,
      marginRight: 12,
    },
    recentImage: {
      width: 120,
      height: 120,
      borderRadius: 12,
      marginBottom: 8,
    },
    recentTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
    },
    menuSection: {
      marginTop: 10,
    },
    menuSectionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuIconContainer: {
      width: 32,
      alignItems: 'center',
    },
    menuIcon: {
      color: colors.subtext,
    },
    menuLabel: {
      flex: 1,
      color: colors.text,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 12,
    },
    destructiveText: {
      color: colors.destructive,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.modalOverlay,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: colors.modalContent,
      borderRadius: 20,
      padding: 24,
      width: '100%',
      maxWidth: 400,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: 'bold',
    },
    closeButton: {
      padding: 4,
    },
    modalAvatarContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    modalAvatarCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.inputBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      position: 'relative',
    },
    modalAvatarImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    modalAvatarText: {
      color: colors.text,
      fontSize: 32,
      fontWeight: 'bold',
    },
    cameraIcon: {
      position: 'absolute',
      bottom: 4,
      right: 4,
      backgroundColor: colors.primary,
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    changePhotoButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.inputBackground,
      color: colors.text,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    bioInput: {
      height: 80,
      textAlignVertical: 'top',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 8,
    },
    saveButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelButtonText: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 16,
    },
  });
};