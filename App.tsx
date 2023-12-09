import { StyleSheet, Text, View, StatusBar, FlatList, ScrollView } from 'react-native'

import React, { useState, useEffect } from 'react'

import Intro from './src/Intro';
import { data } from './src/data';
import QuizScreen from './src/QuizScreen.js'
import ResultScreen from './src/ResultScreen';

import { InterstitialAd, AdEventType, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitIdBanner = 'ca-app-pub-7036694557736762/2797373552';

const adUnitId = 'ca-app-pub-7036694557736762/5596843001';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {


  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
  //     setLoaded(true);
  //     interstitial.show();
  //   });

  //   // Start loading the interstitial straight away
  //   interstitial.load();

  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <Intro />
  // )
  //   return (
  //     <>
  //       <ScrollView style={styles.container}>

  //         <Text style={{ fontWeight: 'bold', fontSize: 56, color: 'white', textAlign: 'center', margin: 10, backgroundColor: 'blue' }}>बजरंग बाण</Text>
  //         <Text style={[styles.heading, { marginTop: 10 }]}>दोहा : </Text>
  //         <Text style={styles.paragraph}>
  //           निश्चय प्रेम प्रतीति ते, बिनय करैं सनमान।{"\n"}तेहि के कारज सकल शुभ, सिद्ध करैं हनुमान॥</Text>

  //         <Text style={styles.heading}>  "चौपाई" </Text>

  //         {data.map(((item, index) => <Text key={index} style={styles.paragraph}>{item}</Text>))}

  //         <Text style={styles.heading}> "दोहा"</Text>
  //         <Text style={styles.paragraph}> "
  //           उर प्रतीति दृढ़, सरन ह्वै, पाठ करै धरि ध्यान।" {"\n"} "बाधा सब हर करैं, सब काम सफल हनुमान॥ "</Text>
  //       </ScrollView>
  //       <View>

  //         {BannerAd ? <BannerAd
  //           unitId={adUnitIdBanner}
  //           size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
  //           requestOptions={{
  //             requestNonPersonalizedAdsOnly: true,
  //           }}
  //         /> : null}

  //       </View>
  //     </>
  //   )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc',

    textAlign: 'center',
    // justifyContent: 'center',





  },
  heading: { color: 'red', fontWeight: 'bold', fontSize: 26, textAlign: 'center', margin: 8 }
  , paragraph: { fontSize: 22, color: 'black', textAlign: 'center', marginVertical: 8 }
});
