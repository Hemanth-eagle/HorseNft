/* eslint-disable no-catch-shadow */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../types/navigation';

const AuthScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    configureGoogleSign();
  }, []);

  const configureGoogleSign = () => {
    GoogleSignin.configure({
      webClientId:'955344731203-qje35hg9vmh48q1rl0469rdsv9n8uort.apps.googleusercontent.com', // Get this from Google Cloud Console
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await GoogleSignin.hasPlayServices();
      console.debug('Google Sign-In has play services');
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        // Here you would typically send the userInfo to your backend
        console.log('Google Sign-In Success:', userInfo);
        navigation.navigate('HomeScreen');
      }
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          setError('Sign in cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          setError('Sign in already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          setError('Play services not available');
          break;
        default:
          setError('Something went wrong with sign in');
          console.error('Google Sign-In Error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signUserIn = () => {
    // Implement email/password sign in logic here
  };

  const toggleAuthMode = () => setIsSignIn(prev => !prev);

  // eslint-disable-next-line react/no-unstable-nested-components
  const MyTextField = ({ value, onChangeText, placeholder, secureTextEntry }: { value: string; onChangeText: (text: string) => void; placeholder: string; secureTextEntry: boolean }) => (
    <View style={styles.textFieldContainer}>
      <TextInput
        style={styles.textField}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#808080"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#dfe6dc', '#f3d7b6', '#c2e5d3']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}
      >
        <View style={styles.backgroundShapes}>
          <View style={[styles.shape, styles.shape1]} />
          <View style={[styles.shape, styles.shape2]} />
          <View style={[styles.shape, styles.shape3]} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {isSignIn ? 'Welcome back!' : 'Create Account'}
          </Text>

          <View style={styles.authContainer}>
            <MyTextField
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              secureTextEntry={false}
            />

            <View style={styles.spacing} />

            <MyTextField
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
            />

            {isSignIn && (
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.button} onPress={signUserIn}>
              <Text style={styles.buttonText}>
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.divider} />
            </View>

            <View>
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity
                  style={[styles.squareTile, isLoading && styles.disabledButton]}
                  onPress={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#4285F4" />
                  ) : (
                    <Image source={require('../assets/google.png')} style={styles.tileImage} />
                  )}
                </TouchableOpacity>
                <View style={styles.socialSpacing} />
                <TouchableOpacity style={styles.squareTile}>
                  <Image source={require('../assets/github.png')} style={styles.tileImage} />
                </TouchableOpacity>
              </View>
              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {isSignIn ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={styles.footerButton}>
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.7,
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  backgroundShapes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  shape: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.8,
  },
  shape1: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 200, 150, 0.5)',
    top: '10%',
    left: '15%',
    transform: [{ scale: 1.2 }],
  },
  shape2: {
    width: 150,
    height: 150,
    backgroundColor: 'rgba(100, 150, 200, 0.6)',
    top: '50%',
    right: '10%',
    transform: [{ scale: 1.3 }],
  },
  shape3: {
    width: 300,
    height: 300,
    backgroundColor: 'rgba(200, 220, 180, 0.5)',
    bottom: '-10%',
    left: '40%',
    transform: [{ scale: 1.4 }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#1a1a1a',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  authContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textFieldContainer: {
    width: '100%',
    marginBottom: 10,
  },
  textField: {
    backgroundColor: '#e6e6e6',
    padding: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'white',
  },
  spacing: {
    height: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: '#666',
  },
  button: {
    backgroundColor: 'black',
    padding: 25,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#999',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialSpacing: {
    width: 25,
  },
  squareTile: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    backgroundColor: '#e6e6e6',
  },
  tileImage: {
    height: 40,
    width: 40,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  footerText: {
    color: '#333333',
    marginRight: 8,
  },
  footerButton: {
    color: '#4285F4',
    fontWeight: '600',
  },
});

export default AuthScreen;
