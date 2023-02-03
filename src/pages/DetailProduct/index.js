import {child, get, ref, remove, set} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import Header from '../../components/molecules/Header';
import {RealDatabase} from '../../config/Fire';
import {getData} from '../../utils';

const DetailProduct = ({route, navigation}) => {
  const {image_link, name, description, price, product_colors, id} =
    route.params;
  const [dataLike, setDataLikes] = useState([]);
  const [isLike, setLike] = useState();
  const [userUid, setUserUid] = useState();
  const [dataCart, setDataCart] = useState([]);
  const handleLikeV2 = async => {
    console.log('KLIK LIKE: ');
    var dataLikeByOd = '';
    dataLike.map(i => {
      if (id === i.id) {
        dataLikeByOd = id;
      }
    });
    if (dataLikeByOd === '') {
      set(ref(RealDatabase, `liked/${userUid}/list/${id}`), {
        id: id,
      });
      dataLike.push({id: id});
      setDataLikes(dataLike);
      setLike(true);
    } else {
      const dbRef = ref(RealDatabase, `liked/${userUid}/list/${id}`);
      remove(dbRef);
      setDataLikes(dataLike.filter(a => a.id !== id));
      setLike(false);
    }
  };

  const getDataLikeV2 = async () => {
    setUserUid(await getData('user_uid'));
    const dbRef = ref(RealDatabase);
    get(child(dbRef, `liked/${userUid}/list`))
      .then(async snapshot => {
        if (snapshot.exists()) {
          const oldData = snapshot.val();
          const datas = [];
          const promises = await Object.keys(oldData).map(key => {
            datas.push({
              id: oldData[key].id,
            });
          });
          await Promise.all(promises);
          setDataLikes(datas);
        } else {
          console.log('No data available inii');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getDataCart = async () => {
    const dbRef = ref(RealDatabase);
    get(child(dbRef, `cart/${userUid}/list`))
      .then(async snapshot => {
        if (snapshot.exists()) {
          const oldData = snapshot.val();
          const datas = [];
          const promises = await Object.keys(oldData).map(key => {
            datas.push({
              id: oldData[key].id,
              qty: oldData[key].qty,
            });
          });
          await Promise.all(promises);
          // console.log('dataHasilParse: ', datas);
          setDataCart(datas);
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleAddCart = async => {
    console.log('KLIK CART: ');
    var dataCartById = '';
    var dataCartByIdQty = '';
    dataCart.map(i => {
      if (id === i.id) {
        dataCartById = i.id;
        dataCartByIdQty = i.qty;
      }
    });
    if (dataCartById === '') {
      set(ref(RealDatabase, `cart/${userUid}/list/${id}`), {
        id: id,
        qty: 1,
      });
      dataCart.push({id: id, qty: 1});
      setDataCart(dataCart);
    } else {
      set(ref(RealDatabase, `cart/${userUid}/list/${id}`), {
        id: id,
        qty: dataCartByIdQty + 1,
      });
      dataCart.push({id: id, qty: dataCartByIdQty + 1});
      setDataCart(dataCart);
    }
  };
  useEffect(() => {
    getDataLikeV2();
    getDataCart();
  });
  return (
    <View style={styles.page}>
      <Header
        title="Detail Product"
        type="icon-back"
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={styles.container}>
          <View style={styles.btnLike}>
            <Button
              type={'icon-only'}
              icon={isLike === true ? 'icon-like-active' : 'icon-like-inactive'}
              onPress={handleLikeV2}
            />
          </View>
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
          <Gap height={20} />
          <View style={styles.btnCart}>
            <Button title="Add to Cart" onPress={handleAddCart} />
          </View>
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
  btnLike: {
    alignItems: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  btnCart: {
    marginHorizontal: 40,
  },
});
