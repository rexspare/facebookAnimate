import React, { FC } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { FeedItemType } from '../models';

interface IFeedItem {
    item: FeedItemType;
    index: number;
    onPressImage: (media: string, index: number) => void;
    imageRef: (ref: any) => void;
}

const FeedItem: FC = (props: IFeedItem) => {
    const { item, index, onPressImage, imageRef } = props

    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>

            <TouchableWithoutFeedback onPress={() => onPressImage(item.media, index)}>
                <Image
                    ref={imageRef}
                    source={{ uri: item.media }}
                    resizeMode="cover"
                    style={styles.imageStyle}
                />
            </TouchableWithoutFeedback>

            <View style={styles.row}>
                <Text style={styles.likeCommnent}>{`${item.likes} Likes`}</Text>
                <Text style={styles.likeCommnent}>{`${item.comments} Comments`}</Text>
            </View>
        </View>
    )
}

export default FeedItem

const styles = StyleSheet.create({
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
    },
    likeCommnent: {
        color: "#000000",
        fontSize: 12
    }
});