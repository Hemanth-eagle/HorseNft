import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const MyButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Sign In</Text>
  </TouchableOpacity>
);