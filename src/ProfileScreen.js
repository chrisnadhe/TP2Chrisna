import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [hobby, setHobby] = useState('');
  const [submittedValues, setSubmittedValues] = useState({ name: '', hobby: '' });

  useEffect(() => {
    AsyncStorage.getItem('profileData')
      .then((result) => {
        if (result) {
          const parsedData = JSON.parse(result);
          setSubmittedValues(parsedData);
        }
      })
      .catch((error) => console.error('Error retrieving data:', error));
  }, []);

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify({ name, hobby }));
      setSubmittedValues({ name, hobby });
      setName('');
      setHobby('');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {submittedValues.name && submittedValues.hobby && ( // Conditionally display values
        <View>
          <Text style={styles.infoText}>Name: {submittedValues.name}</Text>
          <Text style={styles.infoText}>Hobby: {submittedValues.hobby}</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your hobby"
        value={hobby}
        onChangeText={setHobby}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
  },
});

export default ProfileScreen;
