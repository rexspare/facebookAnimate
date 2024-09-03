import React, { FC, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import SwipeCloseImage from 'react-native-swipe-close-image';
import { FeedItem } from '../../components';
import data from '../../data/dummy.json';
import { FeedItemType } from '../../models';
import styles from './styles.home';


const HomeScreen: FC = () => {
    const [imageSource, setImageSource] = useState<string | null>(null);
    const swipeToCloseRef = useRef<any>(null);
    const imageRefs = useRef<any[]>([]);  // Create an array of refs

    const onPressImage = (media: string, index: number) => {
        if (swipeToCloseRef.current && imageRefs.current[index]) {
            swipeToCloseRef.current.onOpen(imageRefs.current[index]);
        }
        setImageSource(media);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item, index }: { item: FeedItemType, index: number }) => (
                    <FeedItem
                        item={item}
                        index={index}
                        imageRef={(ref) => (imageRefs.current[index] = ref)}
                        onPressImage={onPressImage}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            {imageSource && (  // Ensure imageSource is not undefined
                <SwipeCloseImage
                    ref={swipeToCloseRef}
                    imageSource={imageSource}
                />
            )}
        </View>
    )
}

export default HomeScreen
