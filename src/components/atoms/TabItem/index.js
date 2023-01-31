import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IconHomeActive,
  IconHomeInactive,
  IconMyOrderActive,
  IconMyOrderInactive,
  IconMyProfileActive,
  IconMyProfileInactive,
} from '../../../assets';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'Home') {
      return active ? <IconHomeActive /> : <IconHomeInactive />;
    }
    if (title === 'My Orders') {
      return active ? <IconMyOrderActive /> : <IconMyOrderInactive />;
    }
    if (title === 'My Profile') {
      return active ? <IconMyProfileActive /> : <IconMyProfileInactive />;
    }
    return <IconHomeInactive />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};
export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: active => ({
    fontSize: 10,
    color: active ? '#FF6182' : '#B9B9B9',
    // fontFamily: fonts.primary[600],
    marginTop: 4,
  }),
});
