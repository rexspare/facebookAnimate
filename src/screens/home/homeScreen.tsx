import React, { FC, ReactNode, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import SwipeCloseImage from 'react-native-swipe-close-image';
import { FeedItem } from '../../components';
import data from '../../data/dummy.json';
import { FeedItemType } from '../../models';
import styles from './styles.home';


const HomeScreen: FC = () => {
    const [selectedNode, setselectedNode] = useState<string | ReactNode | null>(null);
    const swipeToCloseRef = useRef<any>(null);
    const componentRef = useRef<any[]>([]);  // Create an array of refs

    const onPressImage = (media: string | ReactNode, index: number) => {
        if (swipeToCloseRef.current && componentRef.current[index]) {
            swipeToCloseRef.current.onOpen(componentRef.current[index]);
        }
        setselectedNode(media);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item, index }: { item: FeedItemType, index: number }) => (
                    <FeedItem
                        item={item}
                        index={index}
                        feedRef={(ref) => (componentRef.current[index] = ref)}
                        onPressImage={onPressImage}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            {selectedNode && (  // Ensure imageSource is not undefined
                <SwipeCloseImage
                    ref={swipeToCloseRef}
                    imageSource={selectedNode}
                    isComponent={true}
                    renderComponent={selectedNode}
                />
            )}
        </View>
    )
}

export default HomeScreen
