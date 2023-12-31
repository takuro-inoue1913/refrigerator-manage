import React from 'react';
import { ActivityIndicatorBase, StyleSheet, View } from 'react-native';

export const ActivityIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicatorBase size="large" color="#3498db" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
