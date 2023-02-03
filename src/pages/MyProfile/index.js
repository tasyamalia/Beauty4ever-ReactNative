import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../../components';
import Header from '../../components/molecules/Header';
import {signOut} from 'firebase/auth';
import {Auth} from '../../config/Fire';

const MyProfile = ({navigation}) => {
  const logout = () => {
    signOut(Auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(_error => {
        console.log(_error);
      });
  };
  return (
    <View style={styles.page}>
      <Header title="My Profile" />
      <View style={styles.content}>
        <Text style={styles.selectionLabel}>My Profile</Text>
        <View style={styles.btnLogout}>
          <Button title="Logout" onPress={logout} />
        </View>
      </View>
    </View>
  );
};
export default MyProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperContent: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  selectionLabel: {
    fontSize: 16,
    color: '#000000',
    marginTop: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  btnLogout: {
    marginHorizontal: 40,
  },
});
