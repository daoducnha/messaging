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

    getImages = async () => {
        if (Platform.OS === 'android' && !(await this.hasAndroidPermission)) {
            return;
        }

        const results = await CameraRoll.getPhotos({ first: 20 });
        console.log(results)
        const { edges } = results;

        const loadedImages = edges.map(item => item.node.image);

        this.setState({ images: loadedImages });



    }

    renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
        const style = {
            width: size,
            height: size,
            marginTop,
            marginLeft,
        }

        return <Image source={{ uri }} style={style} />
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