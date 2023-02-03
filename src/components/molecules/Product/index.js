import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Gap, Button} from '../../atoms';

const Product = ({item, isLiked, onPress, onPressCart, onPressLike}) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnLike}>
        <Button
          type={'icon-only'}
          icon={isLiked === true ? 'icon-like-active' : 'icon-like-inactive'}
          onPress={onPressLike}
        />
      </View>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.imageThumbnail}
          source={{uri: item.image_link}}
          alt={item.name}
        />
      </TouchableOpacity>
      <Text style={styles.productName}>{item.name}</Text>
      <Gap height={10} />
      <View style={styles.containerPriceCart}>
        <Text style={styles.price}>
          Rp. {(Number(item.price) * 15000).toLocaleString()}
        </Text>
        <Button
          type={'btn-cart_product'}
          style={styles.btnCart}
          onPress={onPressCart}
        />
      </View>
    </View>
  );
};
export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    height: 270,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    borderColor: '#DFDFDF',
    borderWidth: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    backgroundColor: '#FFFFFF',
    resizeMode: 'contain',
  },
  productName: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  containerPriceCart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: '#FF6182',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginTop: 10,
    fontWeight: 'bold',
  },
  btnCart: {
    alignSelf: 'flex-end',
  },
  btnLike: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
});
