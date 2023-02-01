import React from 'react';
import {StyleSheet, Image, View, FlatList, Text} from 'react-native';
import {Gap, Button} from '../../atoms';

const Product = ({dataProduct, onPress, image, title, price, isLiked}) => {
  return (
    <FlatList
      data={dataProduct}
      renderItem={({item}) => (
        <View style={styles.container}>
          <View style={styles.btnLike}>
            <Button
              type={'icon-only'}
              icon={
                isLiked === true ? 'icon-like-active' : 'icon-like-inactive'
              }
            />
          </View>
          <Image
            style={styles.imageThumbnail}
            source={{uri: item.image_link}}
            alt={item.name}
          />
          <Text style={styles.productName}>{item.name}</Text>
          <Gap height={10} />
          <View style={styles.containerPriceCart}>
            <Text style={styles.price}>
              Rp. {(Number(item.price) * 15000).toLocaleString()}
            </Text>
            <Button type={'btn-cart_product'} style={styles.btnCart} />
          </View>
        </View>
      )}
      //Setting the number of column
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
    />
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
