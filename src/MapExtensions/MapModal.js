import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import MapDetails from './MapDetails';
export default function MapModal({
  mapType,
  setMapType,
  trafficBoolean,
  setTrafficBoolean,
  showTransit,
  setShowTransit,
}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const mapTypes = ['standard', 'satellite', 'terrain'];
  const mapTypeIcons = {
    standard: require('../../assets/layers/standard.png'),
    satellite: require('../../assets/layers/satellite.png'),
    terrain: require('../../assets/layers/terrain.png'),
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        style={{
          width: 35,
          height: 35,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
        }}
        onPress={toggleModal}>
        <Image source={require('../../assets/layers.png')} />
      </TouchableOpacity>

      <Modal
        style={{
          height: 500,
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          margin: 0,
        }}
        isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <View
            style={{
              gap: 20,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
                marginTop: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: '50%',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 20,
                  color: '#5e5e5e',
                  fontWeight: '500',
                }}>
                Map Type
              </Text>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  marginRight: 20,
                }}
                onPress={toggleModal}>
                <Image source={require('../../assets/close.png')} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '100%',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#e6e7ec',
                paddingHorizontal: 20,
              }}>
              {mapTypes.map((type, index) => (
                <TouchableOpacity onPress={() => setMapType(type)} key={index}>
                  <View
                    style={{
                      width: 90,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                    }}>
                    <View
                      style={[
                        {
                          width: 60,
                          height: 60,
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                        type === mapType ? styles.selected : null,
                      ]}>
                      <Image
                        style={{width: 52, height: 52}}
                        source={mapTypeIcons[type]}
                      />
                    </View>
                    <Text
                      style={[
                        {
                          textAlign: 'center',
                          marginTop: 10,
                          color: '#5e5e5e',
                          fontWeight: 'light',
                        },
                        type === mapType ? styles.selectedText : null,
                      ]}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View>
              <MapDetails
                trafficBoolean={trafficBoolean}
                setTrafficBoolean={setTrafficBoolean}
                showTransit={showTransit}
                setShowTransit={setShowTransit}
              />
            </View>
          </View>
        </View>
      </Modal>
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
