import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { runCLI } from 'jest';

const ResultScreen = () => {

    const route = useRoute();
    const arrray = route.params.answers;

    return (
        <View>
            <Text style={[styles.headingStyle, { textAlign: 'center' }]}>ResultScreen</Text>
            {arrray.map((item, index) => {

                return (

                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.text}>Question : {item.question}</Text>
                        <Text style={styles.headingStyle}>{item.answer ? "Correct Answer" : "Incorrect Answer"}</Text>

                    </View>
                )

            }
            )
            }

        </View>
    )
}

export default ResultScreen

const styles = StyleSheet.create({
    text: {
        fontSize: 18, color: 'hotpink', backgroundColor: 'yellow', margin: 4, padding: 4, borderRadius: 5

    },

    headingStyle: { color: 'blue', backgroundColor: 'magenta', fontSize: 22, padding: 10, borderRadius: 12, elevation: 5, marginRight: 4, margin: 4, }

})