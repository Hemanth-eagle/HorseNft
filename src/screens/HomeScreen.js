import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
// import 'react-native-get-random-values';

const providerMetadata = {
    name: 'HorseNFT',
    description: 'Crypto Mobile App',
    url: 'https://equine.com/',
    icons: ['https://your-project-logo.com/'],
    redirect: {
      native: 'horsenft://',
      universal: 'http://localhost:8081/',
    },
};

const HomeScreen = () => {
    const projectId = '7634eabcda61cbb42d627e3b164dae99';

    const {
        open,
        provider,
        isConnected,
        address,
    } = useWalletConnectModal();

    const connectWallet = async () => {
        console.debug('connectWallet');
        if (isConnected) {
            return provider?.disconnect();
        }
        return open();
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/horse-logo.png')} style={styles.logo} />
            <Text style={styles.title}>DeHorses</Text>
            <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
            {!address ? (
                <>
                    <TouchableOpacity 
                        style={styles.connectButton} 
                        onPress={connectWallet}
                    >
                        <Text style={styles.buttonText}>Connect Wallet</Text>
                    </TouchableOpacity>
                    
                    {/* <TouchableOpacity 
                        style={styles.createAccountButton}
                        onPress={() => {
                            // Add logic to guide users to create wallet account
                            // This could open a WebView with wallet's account creation page
                        }}
                    >
                        <Text style={styles.buttonText}>Create Wallet Account</Text>
                    </TouchableOpacity> */}
                </>
            ) : (
                <View style={styles.accountInfo}>
                    <Text style={styles.accountText}>
                        Connected: {address}
                    </Text>
                    <TouchableOpacity 
                        style={styles.disconnectButton} 
                        onPress={() => provider?.disconnect()}
                    >
                        <Text style={styles.buttonText}>Disconnect Wallet</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 40,
    },
    connectButton: {
        backgroundColor: '#4C1D95',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        width: '80%',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    createAccountButton: {
        backgroundColor: '#5B21B6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#2D2D2D',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    walletOption: {
        backgroundColor: '#4C1D95',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    walletOptionText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    accountInfo: {
        backgroundColor: '#2D2D2D',
        padding: 16,
        borderRadius: 8,
    },
    accountText: {
        color: '#ffffff',
        fontSize: 16,
    },
    disconnectButton: {
        backgroundColor: '#B91C1C',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        width: '80%',
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});

export default HomeScreen;