import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system'
import { set } from 'react-native-reanimated';
const widthScreen = Dimensions.get('window').width;
const ImageComponent = () => {
    const [pictures, setPictures] = useState([]);
    const [page, setPage] = useState(0);
    useEffect(() => {
        fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0a0015efc8da091dcfdde28a9f847b66&tags=cats&format=json&nojsoncallback=1')
            .then((respond) =>
                respond.json()
            ).then((result) => {
                let fakeData = []
                result.photos.photo.map((pic, index) => {
                    let srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg"
                    fakeData.push({
                        index: index,
                        id: pic.id,
                        path: srcPath
                    })
                })
                setPictures(fakeData)
            })
    }, [])
    const renderItem = ({ item }) => (
        <View>
            <Image
                resizeMode='contain'
                source={{ uri: item.path }}
                style={{ width: widthScreen, height: 300, borderRadius: 10 }}
            />

        </View>
    );
    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset)
            alert("Lưu ảnh thành công")
        }
    }
    const downloadFile = () => {
        let link2 = ''
        pictures.map((item) => {
            if (item.index === page) {
                link2 = item.path;
            }
        })
        let fileUri = FileSystem.documentDirectory + "small.jpg";
        FileSystem.downloadAsync(link2, fileUri)
            .then(({ uri }) => {
                saveFile(uri);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                onMomentumScrollEnd={(item) => {
                    const currentPage = Math.floor(item.nativeEvent.contentOffset.x / item.nativeEvent.layoutMeasurement.width);
                    setPage(currentPage)
                }}
                showsHorizontalScrollIndicator={true}
                style={styles.flatlist}
                pagingEnabled={true}
                horizontal={true}
                data={pictures}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                onPress={downloadFile}
                style={{
                    backgroundColor: 'cyan',
                    width: 75, height: 75,
                    borderRadius: 100,
                    justifyContent: 'center', alignItems: 'center',
                    position: 'absolute',
                    right: 30,
                    bottom: 100
                }}
            >
                <FontAwesome5 name="download" size={24} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ImageComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    flatlist: {
        marginTop: 200
    }
})
