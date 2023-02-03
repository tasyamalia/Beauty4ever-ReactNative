/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import Header from '../../components/molecules/Header';
import Carousel from 'react-native-reanimated-carousel';
import {ILLBanner1, ILLBanner2, ILLBanner3} from '../../assets';
import {getDataMakeup} from '../../fakebackend/axiosData';
import Product from '../../components/molecules/Product';
import {Gap} from '../../components/atoms';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const widthWindow = Dimensions.get('window').width;
  const Banner = index => {
    if (index.index === 0) {
      return <Image source={ILLBanner1} style={styles.banner_image} />;
    }
    if (index.index === 1) {
      return <Image source={ILLBanner2} style={styles.banner_image} />;
    }
    if (index.index === 2) {
      return <Image source={ILLBanner3} style={styles.banner_image} />;
    }
    return <Image source={ILLBanner1} style={styles.banner_image} />;
  };
  const handleGetData = async () => {
    const response = await getDataMakeup();
    setData(response);
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <View style={styles.page}>
      <Header
        title="Home"
        type="home"
        onPressLike={() => navigation.navigate('Liked')}
        onPressCart={() => navigation.navigate('Cart')}
      />
      <View style={styles.content}>
        <Carousel
          loop
          width={widthWindow}
          height={widthWindow / 3.3}
          autoPlay={true}
          data={['1', '2', '3']}
          scrollAnimationDuration={4000}
          renderItem={({index}) => (
            <View>
              <Banner index={index} />
            </View>
          )}
        />
        <Gap height={20} />
        <View style={styles.product}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <Product
                item={item}
                onPress={() => {
                  navigation.navigate('DetailProduct', {
                    image_link: item.image_link,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    product_colors: item.product_colors,
                  });
                }}
              />
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  banner_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  product: {
    marginHorizontal: 15,
    marginBottom: 140,
  },
});
