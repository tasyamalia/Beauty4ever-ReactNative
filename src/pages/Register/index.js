import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Image, Text} from 'react-native';
import {Header, Input, Button, Gap} from '../../components';
import {Fire} from '../../config';
import {useDispatch} from 'react-redux';
import {useForm} from '../../utils';
import {storeData, getData} from '../../utils';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {Auth, Database, RealDatabase} from '../../config/Fire';
import {doc, setDoc} from 'firebase/firestore';
import {ILLogo} from '../../assets';
import {ref, set} from 'firebase/database';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });
  const dispatch = useDispatch();

  const onContinue = () => {
    console.log(form);
    dispatch({type: 'SET_LOADING', value: true});
    createUserWithEmailAndPassword(Auth, form.email, form.password)
      .then(async success => {
        dispatch({type: 'SET_LOADING', value: false});
        navigation.replace('MainApp');
        const data = {
          fullName: form.fullName,
          email: form.email,
          phoneNumber: form.phoneNumber,
          address: form.address,
          uid: success.user.uid,
        };
        storeData('user', data);
        storeData('user_uid', success.user.uid);
        set(ref(RealDatabase, `users/${success.user.uid}/`), {
          fullName: form.fullName,
          email: form.email,
          phoneNumber: form.phoneNumber,
          address: form.address,
          uid: success.user.uid,
        });
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch({type: 'SET_LOADING', value: false});
        console.log(errorMessage);
      });
  };
  return (
    <>
      <View style={styles.page}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Gap height={40} />
            <View style={styles.container_image}>
              <Image source={ILLogo} style={styles.banner_image} />
            </View>
            <Gap height={10} />
            <Text style={styles.title}>Register Account</Text>
            <Gap height={20} />
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Email "
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />
            <Gap height={24} />
            <Input
              label="Phone Number"
              value={form.phoneNumber}
              onChangeText={value => setForm('phoneNumber', value)}
            />
            <Gap height={24} />
            <Input
              label="Address"
              value={form.address}
              onChangeText={value => setForm('address', value)}
            />
            <Gap height={40} />
            <Button title="Register" onPress={onContinue} />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
  container_image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner_image: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    color: '#FF6182',
    maxWidth: 153,
  },
});
