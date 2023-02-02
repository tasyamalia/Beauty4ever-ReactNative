import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gap, Button} from '../../atoms';

const Header = ({onPressBack, onPressLike, onPressCart, title, type}) => {
  if (type === 'icon-back') {
    return (
      <View style={styles.container}>
        <Button type="icon-only" icon="icon-back" onPress={onPressBack} />
        <Gap width={24} />
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
  if (type === 'home') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Button type="icon-only" icon="icon-like-menu" onPress={onPressLike} />
        <Gap width={12} />
        <Button type="icon-only" icon="icon-cart-menu" onPress={onPressCart} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#FF6182',
    flex: 1,
    textTransform: 'capitalize',
  },
});
