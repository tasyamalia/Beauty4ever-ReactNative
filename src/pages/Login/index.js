import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Input, Button, Link, Gap} from '../../components';
import {useForm} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Auth} from '../../config/Fire';
import { ILLogo } from '../../assets';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({email: '', password: ''});
  const dispatch = useDispatch();

  const login = () => {
    console.log('form: ', form);
    dispatch({type: 'SET_LOADING', value: true});
    signInWithEmailAndPassword(Auth, form.email, form.password)
      .then(res => {
        console.log('success: ', res);
        dispatch({type: 'SET_LOADING', value: false});
        navigation.replace('MainApp');
      })
      .catch(err => {
        console.log('error: ', err);
        dispatch({type: 'SET_LOADING', value: false});
        // showError(err.message);
      });
  };
  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <View style={styles.container_image}>
            <Image source={ILLogo} style={styles.banner_image} />
          </View>
          <Gap height={20} />
          <Text style={styles.title}>Login</Text>
          <Input
            label="Email"
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
          <Gap height={40} />
          <Button title="Sign In" onPress={login} />
          <Gap height={30} />
          <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#FF6182',
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
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
});
