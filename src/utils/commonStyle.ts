import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const commonStyles = {
  image: {
    width: width / 3 - 15,
    height: 80,
    borderRadius: 15,
  },
};

export const fridgeCommonStyles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width,
  },
  box: {
    position: 'relative',
    width: width / 3,
    height: 120,
    justifyContent: 'center',
  },
  image: commonStyles.image,
});
