import {child, get, ref, set} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Gap} from '../../components/atoms';
import Header from '../../components/molecules/Header';
import Product from '../../components/molecules/Product';
import {RealDatabase} from '../../config/Fire';
import {getDataMakeup} from '../../fakebackend/axiosData';

const Liked = ({route, navigation}) => {
  const {userUid} = route.params;
  const [dataLike, setDataLikes] = useState([]);
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [dataCart, setDataCart] = useState([]);
  const widthWindow = Dimensions.get('window').width;

  const handleGetData = async () => {
    const response = await getDataMakeup();
    setData(response);
  };
  const handleGetDataToShow = async () => {
    const dtLike = [];
    data.map((product, i) => {
      // const indx = dataLike.findIndex(it => it.id === product.id);
      const indx = dataLike.findIndex(it => it.id === product.id);
      if (indx > 0) {
        dtLike.push({...product});
      }
    });
    setDataToShow(dtLike);
  };
  const handleAddCart = async id => {
    getDataCart();
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
          setDataCart(datas);
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getDataLikeV2 = async () => {
    const dbRef = ref(RealDatabase);
    get(child(dbRef, `liked/${userUid}/list`))
      .then(async snapshot => {
        if (snapshot.exists()) {
          console.log('HEERE');
          const oldData = snapshot.val();
          const datas = [];
          Object.keys(oldData).map(key => {
            datas.push({
              id: oldData[key].id,
            });
          });
          console.log('YUU' + datas);
          setDataLikes(datas);
        } else {
          console.log('No data available inii');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    handleGetData();
    getDataLikeV2();
    // if (dataLike.values > 0) {
    //   handleGetDataToShow();
    // }
  }, []);

  return (
    <View style={styles.page}>
      <Header
        title="Like"
        type="icon-back"
        onPressBack={() => navigation.goBack()}
      />
      <Gap height={20} />
      {/* <View style={styles.product}>
        <FlatList
          data={dataToShow}
          renderItem={({item}) => (
            <Product
              item={item}
              // onPress={() => {
              //   navigation.navigate('DetailProduct', {
              //     image_link: item.image_link,
              //     name: item.name,
              //     description: item.description,
              //     price: item.price,
              //     product_colors: item.product_colors,
              //     id: item.id,
              //   });
              // }}
              // onPressCart={() => handleAddCart(item.id)}
            />
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View> */}
      <View style={styles.content}>
        {data.map((product, i) => {
          const indx = dataLike.findIndex(it => it.id === product.id);
          if (indx >= 0) {
            return (
              <View style={styles.container(widthWindow)} key={i}>
                <Gap height={5} />
                <TouchableOpacity>
                  <Image
                    style={styles.imageThumbnail}
                    source={{uri: product.image_link}}
                    alt={product.name}
                  />
                </TouchableOpacity>
                <Text style={styles.productName}>{product.name}</Text>
                <Gap height={10} />
                <View style={styles.containerPriceCart}>
                  <Text style={styles.price}>
                    Rp. {(Number(product.price) * 15000).toLocaleString()}
                  </Text>
                  <Button
                    type={'btn-cart_product'}
                    style={styles.btnCart}
                    // onPress={onPressCart}
                  />
                </View>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};
export default Liked;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
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
  product: {
    marginHorizontal: 15,
    marginBottom: 140,
  },
  container: widthWindow => ({
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    height: 270,
    width: widthWindow / 2,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    borderColor: '#DFDFDF',
    borderWidth: 1,
  }),
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
