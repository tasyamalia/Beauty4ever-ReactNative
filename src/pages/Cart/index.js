import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Header from '../../components/molecules/Header';
import {child, get, ref} from 'firebase/database';
import {RealDatabase} from '../../config/Fire';
import {getDataMakeup} from '../../fakebackend/axiosData';

const Cart = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataCart, setDataCart] = useState([]);

  const handleGetData = async () => {
    const response = await getDataMakeup();
    setData(response);
  };

  const getDataCart = async () => {
    const dbRef = ref(RealDatabase);
    get(child(dbRef, 'cart/HTiO4T92NEfmV9l8uBC6SWZCZPg1/list'))
      .then(async snapshot => {
        if (snapshot.exists()) {
          const oldData = snapshot.val();
          const datas = [];
          Object.keys(oldData).map(key => {
            datas.push({
              id: oldData[key].id,
              qty: oldData[key].qty,
            });
          });
          console.log('dataHasilParse: ', datas);
          setDataCart(datas);
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetData();
    getDataCart();
  }, []);

  return (
    <View style={styles.page}>
      <Header
        title="Cart"
        type="icon-back"
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        {data.map((product, i) => {
          const indx = dataCart.findIndex(it => it.id === product.id);
          if (indx >= 0) {
            return (
              <View style={styles.container}>
                <Image
                  style={styles.imageThumbnail}
                  alt={product.name}
                  source={product.image_link}
                />
                <Text style={styles.selectionLabel}>{product.name}</Text>
                <Text style={styles.price}>
                  {dataCart[indx].qty} x Rp.{' '}
                  {(Number(product.price) * 15000).toLocaleString()}
                </Text>
              </View>
            );
          }
        })}
      </View>
      <View>
        <Text style={styles.selectionLabel}>Total price: </Text>
        <Text style={styles.selectionLabel}>
          Rp.
          {data
            .map((product, i) => {
              const indx = dataCart.findIndex(it => it.id === product.id);
              if (indx >= 0) {
                return Number(product.price) * 15000 * dataCart[indx].qty;
              } else {
                return 0;
              }
            })
            .reduce((a, b) => a + b, 0)
            .toLocaleString()}
        </Text>
      </View>
    </View>
  );
};
export default Cart;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,

    backgroundColor: '#FFFFFF',
    padding: 10,
    borderColor: '#DFDFDF',
    borderWidth: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    border: 1,
    borderColor: '#000000',
    padding: 10,
    borderWidth: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    backgroundColor: '#FFFFFF',
    resizeMode: 'contain',
  },
  content: {
    paddingHorizontal: 16,
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
  price: {
    color: '#FF6182',
    fontSize: 16,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  selectionLabel: {
    fontSize: 14,
    color: '#000000',
    marginTop: 30,
    marginBottom: 16,
  },
  textDefault: {
    fontSize: 14,
    color: '#000000',
  },
});
