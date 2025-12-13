// // import { Tabs } from 'expo-router';
// // import { Ionicons } from '@expo/vector-icons';

// // export default function TabsLayout() {
// //   return (
// //     <Tabs
// //       screenOptions={{
// //         headerShown: false,
// //         tabBarActiveTintColor: 'white',
// //         tabBarInactiveTintColor: 'gray',
// //         tabBarStyle: {
// //           backgroundColor: '#121212', // A dark theme for a music app
// //           borderTopWidth: 0,
// //         },
// //       }}>
// //       <Tabs.Screen
// //         name="index"
// //         options={{
// //           title: 'Home',
// //           tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="search"
// //         options={{
// //           title: 'Search',
// //           tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="library"
// //         options={{
// //           title: 'Library',
// //           tabBarIcon: ({ color, size }) => <Ionicons name="library" size={size} color={color} />,
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="profile"
// //         options={{
// //           title: 'Profile',
// //           tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
// //         }}
// //       />
// //     </Tabs>
// //   );
// // }


// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { AudioProvider } from './AudioProvider';

// import { Ionicons } from "@expo/vector-icons";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <AudioProvider>
//       <Tabs
//         screenOptions={{
//           tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//           headerShown: false,
//           tabBarButton: HapticTab,
//           tabBarBackground: TabBarBackground,
//           tabBarStyle: Platform.select({
//             ios: {
//               // Use a transparent background on iOS to show the blur effect
//               position: 'absolute',
//             },
//             default: {},
//           }),
//         }}>
//         <Tabs.Screen
//           name="index"
//           options={{
//             title: 'Home',
//             tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//           }}
//         />
//         <Tabs.Screen
//           name="search"
//           options={{
//             title: "Search",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="search-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="library"
//           options={{
//             title: "Library",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="book-outline" size={size} color={color} />
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="player"
//           options={{
//             title: "Player",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="musical-notes-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="profile"
//           options={{
//             title: "Profile",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="person-outline" size={size} color={color} />
//             ),
//           }}
//         />

//       </Tabs>
//     </AudioProvider>
//   );
// }
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

          <Tabs.Screen
        name="player"
        options={{
          title: "Player",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
     
    </Tabs>
  );
}