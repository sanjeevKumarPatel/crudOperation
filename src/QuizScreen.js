import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useState, useEffect } from 'react'

import data from '../data'
import { useNavigation } from '@react-navigation/native'

const QuizScreen = () => {
    const navigation = useNavigation();

    // Correct Answers with points for marks calcualation in result
    const [points, setPoints] = useState(0);


    // Answer status true or false

    const [answerStatus, setAnswerStatus] = useState(null);

    const [answers, setAnswers] = useState([]);  // For result preaparation

    // Question with Index

    const [index, setIndex] = useState(0);

    // Answer index given by the user
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)


    // counter for timer or timeout
    const [counter, setCounter] = useState(15)

    let interval = null;


    const [answerIndex, setAnswerIndex] = useState(null)


    console.log(selectedAnswerIndex)

    const currentQuestion = data[index];


    const handleNextButton = () => {

        setIndex((index) => (index + 1))
        setAnswerStatus(null);
        setSelectedAnswerIndex(null)


    }
    useEffect(() => {
        setIndex(0)
        return () => clearTimeout(interval);

    }, [index == data.length])

    useEffect(() => {
        if (selectedAnswerIndex !== null) {
            if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
                setPoints((points) => points + 10);
                setAnswerStatus(true);
                answers.push({ question: index + 1, answer: true })
            } else {
                setAnswerStatus(false);
                answers.push({ question: index + 1, answer: false })
            }
        }
    }, [selectedAnswerIndex])

    useEffect(() => {
        setSelectedAnswerIndex(null)
        setAnswerIndex(null)

    }, [currentQuestion])


    useEffect(() => {
        const myInterval = () => {
            if (counter >= 1) {
                setCounter((counter) => counter - 1)
            }
            if (counter === 0) {
                setIndex(index + 1)
                setCounter(10)
            }

        }

        interval = setTimeout(myInterval, 1000);

        // return () => clearTimeout(interval);

    }, [counter])

    useEffect(() => {

        if (index + 1 > data.length) {
            navigation.navigate('Result', { answers: answers, points: points })


        }

    }, [currentQuestion])

    useEffect(() => {
        if (!interval) {
            setCounter(15)
        }
    })

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 6 }}>
                <Text style={styles.headingStyle}>Quiz App</Text>
                <Text style={styles.headingStyle}>{counter}</Text>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 6 }}>
                <Text style={styles.headingStyle}> Question</Text>
                <Text style={styles.headingStyle} >{index + 1} / {data.length} </Text>

            </View>
            <View style={styles.questionWrapper}>
                <Text style={styles.question} >{currentQuestion?.question}</Text>
            </View>

            <Pressable >
                {currentQuestion?.options.map((option, index) => <TouchableOpacity onPress={() => { if (selectedAnswerIndex == null) setSelectedAnswerIndex(index) }}
                    key={index}
                    style={selectedAnswerIndex === index && index === currentQuestion.correctAnswerIndex ? styles.correctOptionWrapper :
                        selectedAnswerIndex !== null && selectedAnswerIndex === index ? styles.wrongOptionWrapper : styles.optionWrapper}>
                    <Text style={styles.option} >({option.options})</Text>
                    <Text style={styles.optionText}>{option.answer}</Text>
                </TouchableOpacity>)}
            </Pressable >


            <View style={{ alignItems: 'center', marginVertical: 30 }}>
                <Pressable onPress={() => handleNextButton(index)}>
                    <Text style={{ fontWeight: '500', fontSize: 24, backgroundColor: 'lightgreen', color: 'white', padding: 14, borderRadius: 22, borderWidth: 2, borderColor: 'red', elevation: 4, marginVertical: 23 }}>Next Question</Text>
                </Pressable>

                {answerStatus == null ? null : answerStatus ? <Text style={{ fontWeight: '500', fontSize: 24, backgroundColor: 'lightgreen', color: 'white', padding: 14, borderRadius: 22, borderWidth: 2, borderColor: 'red', elevation: 4 }}>Correct Answer</Text> : <Text style={{ fontWeight: '500', fontSize: 24, backgroundColor: 'hotpink', color: 'white', padding: 14, borderRadius: 22, borderWidth: 2, borderColor: 'red', elevation: 4 }}>Wrong Answer</Text>}

            </View>

        </>
    )
}

export default QuizScreen

const styles = StyleSheet.create({
    questionWrapper: {
        margin: 16, padding: 8, backgroundColor: 'lightblue', opacity: .7, borderRadius: 5
    },

    question: {
        fontSize: 20, fontWeight: '500', color: 'blue', elevation: 4,
    }
    , optionWrapper: {
        flexDirection: 'row', gap: 5, marginHorizontal: 24, marginVertical: 4, borderRadius: 56, borderWidth: 0.5, borderColor: '#00ffff',
    }, correctOptionWrapper: {
        flexDirection: 'row', gap: 5, marginHorizontal: 24, marginVertical: 4, borderRadius: 56, borderWidth: 0.5, borderColor: '#00ffff', backgroundColor: 'lightgreen'
    },
    wrongOptionWrapper: {
        flexDirection: 'row', gap: 5, marginHorizontal: 24, marginVertical: 4, borderRadius: 56, borderWidth: 0.5, borderColor: '#00ffff', backgroundColor: 'hotpink'
    },
    option: {
        fontSize: 18, fontWeight: '300', color: 'black', borderWidth: .5, borderRadius: 78, padding: 12, borderColor: '#00ffff',

    },
    optionText: {
        fontSize: 18, fontWeight: '300', color: 'black', borderRadius: 78, padding: 12, flex: 1, borderColor: '#00ffff'
    },
    headingStyle: { color: 'blue', backgroundColor: 'magenta', fontSize: 22, padding: 10, borderRadius: 12, elevation: 5, marginRight: 4 }

}) 