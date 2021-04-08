import React, { Component, lazy } from 'react'
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import * as Permissions from 'expo-permissions';
import Grid from './Grid'

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends Component {

    loading = true;
    cursor = null;

    static defaultProps = {
        onPressImage: () => { },
    }

    state = {
        images: [
            { uri: 'https://picsum.photos/600/600?image=10' },
            { uri: 'https://picsum.photos/600/600?image=20' },
            { uri: 'https://picsum.photos/600/600?image=30' },
            { uri: 'https://picsum.photos/600/600?image=40' },
            { uri: 'https://picsum.photos/600/600?image=50' },
            { uri: 'https://picsum.photos/600/600?image=60' },
            { uri: 'https://picsum.photos/600/600?image=70' },
            { uri: 'https://picsum.photos/600/600?image=80' },
            { uri: 'https://picsum.photos/600/600?image=90' },
            { uri: 'https://picsum.photos/600/600?image=100' },
        ],
    }

    // componentDidMount() {
    //     this.getImages();
    // }

    async hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) { return true; }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';

    }

    getImages = async (after) => {
        if (this.loading) return;

        if (Platform.OS === 'android' && !(await this.hasAndroidPermission)) {
            return;
        }

        const results = await CameraRoll.getPhotos({ first: 20, after });

        const { edges, page_info: { has_next_page, end_cursor } } = results;

        const loadedImages = edges.map(item => item.node.image);

        this.setState({ images: this.state.images.concat(loadedImages) },

            () => {
                this.loading = false;
                this.cursor = has_next_page ? end_cursor : null;
            });



    }

    getNextImages = () => {
        if (!this.cursor) return;
        this.getImages(this.cursor);
    }

    renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
        const { onPressImage } = this.props;
        const style = {
            width: size,
            height: size,
            marginTop,
            marginLeft,
        }

        return (
            <TouchableOpacity
                key={uri}
                activeOpacity={0.75}
                onPress={() => onPressImage(uri)}
                style={style}
            >
                <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
        );
    }
    render() {
        const { images } = this.state;
        console.log(images);
        return (
            <Grid
                data={images}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
            />
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    }
})