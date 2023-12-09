import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { Children, useEffect, useState } from 'react'

// import firestore from '@react-native-firebase/firestore';

import database from '@react-native-firebase/database';
import { data } from './data';


const Intro = () => {

    const [myData, setMyData] = useState([]);

    const [inputTextValue, setInputTextValue] = useState(null)
    let [list, setList] = useState([])

    const [isUpdateData, setIsUpdateData] = useState(false)
    const [selectedCardIndex, setSelectedCardIndex] = useState(null)


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {

        try {
            let data = await database().ref('data/users').on('value', (tempData) => {

                setList(tempData.val())
                setInputTextValue('')
            })



            console.log(list)

        } catch (err) {
            console.log(err)
        }

    }




    const handleAddData = async () => {
        try {
            if (inputTextValue.length > 1) {
                let index = list.length;
                const response = await database()
                    .ref(`data/users/${index}`)
                    .set({
                        name: inputTextValue,
                    }).then(() => console.log('Data set.'));
            }

        }
        catch (err) { console.log(err) }
    }


    const handleCardPress = (item, index) => {
        setInputTextValue(item.name)
        setIsUpdateData(true)
        setSelectedCardIndex(index)
    }

    const handleUpdateData = async () => {

        console.log("button is pressed")
        if (inputTextValue.length > 2) { await database().ref(`data/users/${selectedCardIndex}`).update({ name: inputTextValue }) } else return false

        setInputTextValue('')
        setIsUpdateData(false)
    }

    const handleDelete = (item, index) => {
        Alert.alert("Alert", `Are you sure want to delete ${item.name} ?`, [
            {
                text: 'Yes',
                onPress: async () => {
                    const response = await database().ref(`data/users/${index}`).remove()

                }
            },
            {
                text: 'No',
                onPress: () => {
                    console.log('NO pressed')
                }
            }])
    }


    return (
        <View style={styles.container}>

            {/* {list.map((item) => <Text style={styles.card}>{item.name}</Text>)} */}

            <TextInput placeholder='Enter your name here' style={styles.input} onChangeText={(text) => setInputTextValue(text)} value={inputTextValue} />

            {isUpdateData ? <Button title='Update' onPress={handleUpdateData} /> : <Button title='Add' onPress={handleAddData} />}


            <FlatList
                data={list}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    if (item) {
                        return <View>
                            <TouchableOpacity onPress={() => handleCardPress(item, index)} onLongPress={() => handleDelete(item, index)} >
                                <Text style={styles.card}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                }
                }
            />
        </View >
    )
}

export default Intro



const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        paddingLeft: 16,
        margin: 6, borderRadius: 6,
        paddingVertical: 8

    }, container: {
        padding: 12, flex: 1,
    },
    card: {
        borderWidth: 1, padding: 8, borderColor: 'green', backgroundColor: 'hotpink', fontSize: 16, paddingLeft: 23, borderRadius: 45, color: "white", marginTop: 16
    }
})