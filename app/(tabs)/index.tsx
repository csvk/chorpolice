import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const App: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async (soundFile: any) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    await sound.playAsync();
  };

  const handleCallPolice = () => {
    playSound(require('../../assets/callpolice.m4a'));
  };

  const handleOrder = () => {
    const soundFiles = [
      require('../../assets/chor.m4a'),
      require('../../assets/dakait.m4a'),
    ];
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    playSound(soundFiles[randomIndex]);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/image.jpg')} style={styles.image} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleCallPolice}>
          <Text style={styles.buttonText}>Call Police</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleOrder}>
          <Text style={styles.buttonText}>Give Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 120,
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
