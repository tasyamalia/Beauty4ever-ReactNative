import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/molecules/Header';

const Liked = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Like"
        type="icon-back"
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.selectionLabel}>Like</Text>
      </View>
    </View>
  );
};
export default Liked;

const styles = StyleSheet.create({
  page: {
    // backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    // backgroundColor: colors.white,
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
});
