import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};
export default Loading;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#FF6182',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 18,
    color: '#FF6182',
    marginTop: 16,
  },
});
