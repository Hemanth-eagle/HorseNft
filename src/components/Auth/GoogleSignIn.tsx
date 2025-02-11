import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

const { GoogleSignIn } = NativeModules;

export const GoogleSignInButton = () => {
    const navigation = useNavigation<NavigationProps>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const userInfo = await GoogleSignIn.signIn(
                '744658552046-gjvi6liju8h2eo3kio5bk8umdtp3k3ai.apps.googleusercontent.com',
            );
            console.log('Google Sign-In Success:', userInfo);
            
            if (userInfo) {
                // Here you would typically send the userInfo to your backend
                console.log('Google Sign-In Success:', userInfo);
                navigation.navigate('HomeScreen');
            }
        } catch (error: any) {
            switch (error.code) {
                case 'CANCELLED':
                    setError('Sign in cancelled');
                    break;
                case 'NO_CREDENTIAL':
                    setError('No credentials available');
                    break;
                default:
                    setError(error.message || 'Something went wrong with sign in');
                    console.error('Google Sign-In Error:', error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#4285F4" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.googleButton}
                onPress={handleGoogleSignIn}
                disabled={isLoading}
            >
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
            
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    googleButton: {
        backgroundColor: '#4285F4',
        padding: 16,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    googleButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    errorText: {
        color: '#FF0000',
        marginTop: 10,
        textAlign: 'center',
    },
});
