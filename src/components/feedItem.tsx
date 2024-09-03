import React, { FC, ReactNode } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { FeedItemType } from '../models';
import { getRandomHexColor } from '../utils/myUtils';

interface IFeedItem {
    item: FeedItemType;
    index: number;
    onPressImage: (media: string | ReactNode, index: number) => void;
    feedRef: (ref: any) => void;
}

const colors = [
    "#FF5733", // red-orange
    "#33FF57", // green
    "#3357FF", // blue
    "#FF33A6", // pink
    "#FFD700", // gold
    "#800080", // purple
    "#00CED1", // dark turquoise
    "#FF4500", // orange-red
    "#2E8B57", // sea green
    "#8B4513"  // saddle brown
];

const FeedItem: FC<IFeedItem> = (props: IFeedItem) => {
    const { item, index, onPressImage, feedRef } = props
    const styles = styles_(index)

    const renderContect = () => {
        return (
            <View style={styles.content}>
                <Text style={styles.title}>{`name = ${item.title} \n index = ${index}`}</Text>
            </View>
        )
    }

    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>

            <TouchableOpacity
                activeOpacity={0.8}
                ref={feedRef}
                onPress={() => onPressImage(renderContect(), index)}>
                {renderContect()}
            </TouchableOpacity>

            <View style={styles.row}>
                <Text style={styles.likeCommnent}>{`${item.likes} Likes`}</Text>
                <Text style={styles.likeCommnent}>{`${item.comments} Comments`}</Text>
            </View>
        </View>
    )
}

export default FeedItem

const styles_ = (index: number) => StyleSheet.create({
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
    },
    content: {
        width: '100%',
        backgroundColor: colors[index % colors.length],
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    }
});