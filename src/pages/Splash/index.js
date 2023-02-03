import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ILLogo} from '../../assets';
import {onAuthStateChanged} from 'firebase/auth';
import {Auth} from '../../config/Fire';

const Splash = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, user => {
      setTimeout(() => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log('user: ', user);
          navigation.replace('MainApp');
        } else {
          // User is signed out
          navigation.replace('Login');
        }
      }, 3000);
    });
    return () => unsubscribe();
  }, [navigation]);
  return (
    <View style={styles.page}>
      <Image source={ILLogo} style={styles.banner_image} />
      <Text style={styles.title}>Beauty4ever</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4E7E7',
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    color: '#FF6182',
  },
  banner_image: {
    width: 200,
    height: 130,
    resizeMode: 'contain',
  },
});
