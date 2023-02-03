import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Header from '../../components/molecules/Header';

const DetailProduct = ({route, navigation}) => {
  const {image_link, name, description, price, product_colors} = route.params;
  return (
    <View style={styles.page}>
      <Header
        title="Detail Product"
        type="icon-back"
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={styles.container}>
          <Image
            style={styles.imageThumbnail}
            source={{uri: image_link}}
            alt={name}
          />
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.price}>
            Rp. {(Number(price) * 15000).toLocaleString()}
          </Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.variant}>Variasi : </Text>
          {product_colors.map(item => (
            <Text style={{color: item.hex_value}} key={item.hex_value}>
              {item.colour_name}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};
export default DetailProduct;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
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
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    resizeMode: 'contain',
  },
  variant: {
    color: '#000000',
    fontSize: 12,
    marginTop: 40,
  },
  productName: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    color: '#000000',
    fontSize: 12,
    marginTop: 20,
  },
  containerPriceCart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: '#FF6182',
    fontSize: 16,
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
