import React, { useRef, useState } from 'react';
import { View, Image, TouchableWithoutFeedback, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import SwipeCloseImage from 'react-native-swipe-close-image';

const data = [
  { id: 1, media: "https://picsum.photos/1000/700", title: "John Doe" },
  { id: 2, media: "https://picsum.photos/1000/700", title: "Smith Doe" },
  { id: 3, media: "https://picsum.photos/1000/700", title: "Marnus Doe" },
  { id: 4, media: "https://picsum.photos/1000/700", title: "Jacob Doe" },
  { id: 5, media: "https://picsum.photos/1000/700", title: "William Doe" },
];

const App = () => {
  const [imageSource, setImageSource] = useState<string | null>(null);
  const swipeToCloseRef = useRef<any>(null);
  const imageRefs = useRef<any[]>([]);  // Create an array of refs

  const onPressImage = (media: string, index: number) => {
    if (swipeToCloseRef.current && imageRefs.current[index]) {
      swipeToCloseRef.current.onOpen(imageRefs.current[index]);
    }
    setImageSource(media);
  };

  const renderItem = ({ item, index }: { item: typeof data[0]; index: number }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>

      <TouchableWithoutFeedback onPress={() => onPressImage(item.media, index)}>
        <Image
          ref={(ref) => (imageRefs.current[index] = ref)}  // Assign ref for each item
          source={{ uri: item.media }}
          resizeMode="cover"
          style={styles.imageStyle}
        />
      </TouchableWithoutFeedback>

      <View style={styles.row}>
        <Text>100 Likes</Text>
        <Text>10 Comments</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {imageSource && (  // Ensure imageSource is not undefined
        <SwipeCloseImage
          ref={swipeToCloseRef}
          imageSource={imageSource}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    width: Dimensions.get('window').width,
    height: 250,
    marginBottom: 10,
  },
  item: {
    width: '100%',
    borderBottomWidth: 1 / 2,
    paddingBottom: 10
  },
  title: {
    color: "#000000",
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 15,
    marginHorizontal: 10
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  }
});

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified']);

export default App;
