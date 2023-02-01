import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  IconBack,
  IconCartMenu,
  IconLikeActive,
  IconLikeInactive,
  IconLikeMenu,
} from '../../../assets';

const IconOnly = ({onPress, icon}) => {
  const Icon = () => {
    if (icon === 'icon-back') {
      return <IconBack />;
    }
    if (icon === 'icon-like-active') {
      return <IconLikeActive />;
    }
    if (icon === 'icon-like-inactive') {
      return <IconLikeInactive />;
    }
    if (icon === 'icon-like-menu') {
      return <IconLikeMenu />;
    }
    if (icon === 'icon-cart-menu') {
      return <IconCartMenu />;
    }
    return <IconBack />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};
export default IconOnly;
