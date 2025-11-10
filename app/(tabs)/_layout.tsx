import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bài 1',
        }}
      />
      <Tabs.Screen
        name="bai2"
        options={{
          title: 'Bài 2',
        }}
      />
      <Tabs.Screen
        name="bai3"
        options={{
          title: 'Bài 3',
        }}
      />
      <Tabs.Screen
        name="bai4"
        options={{
          title: 'Bài 4',
        }}
      />
      <Tabs.Screen
        name="bai5"
        options={{
          title: 'Bài 5',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
