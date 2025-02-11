import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export const MyTextField = ({ controller, placeholder, secureTextEntry }) => (
  <View style={styles.textFieldContainer}>
    <TextInput
      style={styles.textField}
      placeholder={placeholder}
      placeholderTextColor="#808080"
      secureTextEntry={secureTextEntry}
      value={controller.value}
      onChangeText={controller.onChange}
    />
  </View>
);