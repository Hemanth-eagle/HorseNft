import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const SquareTile = ({ imagePath }) => (
  <View style={styles.squareTile}>
    <Image source={imagePath} style={styles.tileImage} />
  </View>
);