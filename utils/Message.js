import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

const Message = ({ message = '', showMessage }) => {
  const bottomPosition = new Animated.Value(-100);

  useEffect(() => {
    if (showMessage) {
      Animated.timing(bottomPosition, {
        toValue: 20,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();

      setTimeout(() => {
        Animated.timing(bottomPosition, {
          toValue: -100,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start(() => {
          setShowMessage = false;
        });
      }, 2000);
    }
  }, [showMessage]);


  return showMessage ? (
    <Animated.View style={[styles.messageBox, { bottom: bottomPosition }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  messageBox: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginHorizontal: '10%',
    borderRadius: 20,
    zIndex: 999,
  },
  message: {
    color: '#000000',
    fontSize: 14,
  },
});

export default Message;