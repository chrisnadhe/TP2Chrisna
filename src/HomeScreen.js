import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function HomeScreen() {
  const dummyName = 'Chrisna Dhefanni';
  const dummyClass = 'TXCA';
  const dummyNIM = '2401986895';

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Selamat datang pada aplikasi ini</Text>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.nameClassText}>Name: {dummyName}</Text>
        <Text style={styles.nameClassText}>Class: {dummyClass}</Text>
        <Text style={styles.nameClassText}>NIM: {dummyNIM}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  topContainer: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameClassText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
