import React, { useEffect, useState } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";

const ErrorMessage = ({ errorMessage, showErrorMessage }) => {
  const bottomPosition = new Animated.Value(-100);

  useEffect(() => {
    if (showErrorMessage) {
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
          setShowErrorMessage = false;
        });
      }, 2000);
    }
  }, [showErrorMessage]);

  return showErrorMessage ? (
    <Animated.View style={[styles.errorMessageBox, { bottom: bottomPosition }]}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  errorMessageBox: {
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginHorizontal: "10%",
    borderRadius: 20,
    zIndex: 999,
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 14,
  },
});

export default ErrorMessage;
