import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Gap, Input} from '../../components';
import Header from '../../components/molecules/Header';
import {signOut} from 'firebase/auth';
import {Auth, RealDatabase} from '../../config/Fire';
import {getData} from '../../utils';
import {child, get, ref} from 'firebase/database';

const MyProfile = ({navigation}) => {
  const [dataUser, setDataUser] = useState([]);
  const logout = () => {
    signOut(Auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(_error => {
        console.log(_error);
      });
  };
  const getDataUser = async () => {
    const user_uid = await getData('user_uid');
    const dbRef = ref(RealDatabase);
    get(child(dbRef, `users/${user_uid}`))
      .then(async snapshot => {
        if (snapshot.exists()) {
          setDataUser(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <View style={styles.page}>
      <Header title="My Profile" />
      <View style={styles.content}>
        <Gap height={20} />
        <Input label="Full Name" value={dataUser.fullName} disable />
        <Gap height={20} />
        <Input label="Email" value={dataUser.email} disable />
        <Gap height={20} />
        <Input label="Phone Number" value={dataUser.phoneNumber} disable />
        <Gap height={20} />
        <Input label="Address" value={dataUser.address} disable />
        <Gap height={20} />
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
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginHorizontal: 24,
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
