import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const Category = ({ navigation }) => {
    const [pictures, setPictures] = useState([]);
    const [pictures2, setPictures2] = useState([]);
    const _pressImage = () => {
        navigation.navigate('ImageComponent')
    }
    useEffect(() => {
        fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=28a9bdae541722608815416e493b16a3&tags=dogs&format=json&nojsoncallback=1')
            .then((respond) =>
                respond.json()
            ).then((result) => {
                let dataImage = result.photos.photo.map((pic, index) => {
                    let srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg"
                    if (index < 50) {
                        return (
                            <TouchableHighlight
                                key={pic.id}

                                onPress={_pressImage}
                                style={styles.touch}
                            >
                                <View>
                                    <Image
                                        resizeMode='contain'
                                        source={{ uri: srcPath }}
                                        style={{ width: 200, height: (Math.random() * 30) + 140, borderRadius: 10 }}
                                    />
                                    <View
                                        style={styles.view}
                                    >
                                        <Entypo name="eye" size={24} color="black" />
                                        <Text>{Math.ceil(Math.random() * 300)} View</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )
                    }
                })
                let dataImage2 = result.photos.photo.map((pic, index) => {
                    let srcPath = "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg"

                    if (index >= 50) {
                        return (
                            <TouchableHighlight
                                key={pic.id}

                                onPress={_pressImage}
                                style={styles.touch}
                            >
                                <View>
                                    <Image
                                        resizeMode='contain'
                                        source={{ uri: srcPath }}
                                        style={{ width: 200, height: Math.random() * 30 + 120, borderRadius: 10 }}
                                    />
                                    <View
                                        style={styles.view}
                                    >
                                        <Entypo name="eye" size={24} color="black" />
                                        <Text>{Math.ceil(Math.random() * 300)} View</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )
                    }
                })
                setPictures(dataImage)
                setPictures2(dataImage2)
            })
    }, [])

    return (
        <SafeAreaView style={styles.container}>



            <ScrollView>

                <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                    <View
                        style={{ borderRadius: 20 }}
                    >
                        {pictures}
                    </View>
                    <View
                        style={{ borderRadius: 20 }}
                    >
                        {pictures2}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default Category


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    touch: {
        marginTop: 10,
        borderRadius: 40,
    },
    view: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        color: 'black',
        backgroundColor: 'white',
        opacity: 0.4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    }
});
