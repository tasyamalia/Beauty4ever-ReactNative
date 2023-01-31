import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {IconCartProduct} from '../../../assets';

const BtnCartProduct = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container()} onPress={onPress}>
      <IconCartProduct />
    </TouchableOpacity>
  );
};
export default BtnCartProduct;
const styles = StyleSheet.create({
  container: () => ({
    backgroundColor: '#FFFFFF',
    width: 45,
    height: 45,
    borderRadius: 99,
    borderColor: '#FF6182',
    borderWidth: 1,
  }),
});
