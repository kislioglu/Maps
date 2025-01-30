import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function MapDetails({
  trafficBoolean,
  setTrafficBoolean,
  showTransit,
  setShowTransit,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 5,
        gap: 25,
      }}>
      <TouchableOpacity
        style={{
          gap: 10,
          alignItems: 'center',
        }}
        onPress={() => setTrafficBoolean(!trafficBoolean)}>
        <View
          style={[
            {
              width: 60,
              height: 60,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            },
            trafficBoolean ? styles.selected : null,
          ]}>
          <Image
            style={{
              width: 52,
              height: 52,
            }}
            source={require('../../assets/layers/traffic.png')}
          />
        </View>

        <Text
          style={[
            {color: '#5e5e5e'},
            trafficBoolean ? styles.selectedText : null,
          ]}>
          Traffic
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          gap: 10,
          alignItems: 'center',
        }}
        onPress={() => setShowTransit(!showTransit)}>
        <View
          style={[
            {
              width: 60,
              height: 60,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            },
            showTransit ? styles.selected : null,
          ]}>
          <Image
            style={{
              width: 52,
              height: 52,
            }}
            source={require('../../assets/layers/transit.png')}
          />
        </View>

        <Text
          style={[
            {color: '#5e5e5e'},
            showTransit ? styles.selectedText : null,
          ]}>
          Transit
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    selected: {
      borderWidth: 2,
      borderColor: 'green',
      borderRadius: 12,
    },
    selectedText: {
      color: 'green',
    },
  });
  