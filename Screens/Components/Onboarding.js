import { StyleSheet, Text, View, FlatList, Animated } from 'react-native'
import React, { useState , useRef} from 'react'
import slides from '../../slides'
import OnboardingItem from './OnboardingItem'
import Paginator from './Paginator'
import NextButton from './NextButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



const Onboarding = () => {

const [currentIndex, setCurrentIndex]= useState(0);
const scrollX = useRef(new Animated.Value(0)).current;
const slidesRef = useRef(null);

const viewableItemsChanged = useRef(({ viewableItems }) => {
  setCurrentIndex(viewableItems[0].index);
}).current;

const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

const scrollTo = async () => { 
  if(currentIndex < slides.length - 1) {
    slidesRef.current.scrollToIndex({index: currentIndex + 1});
  } else {
    try {
      await AsyncStorage.setItem('@viewedOnboarding', 'true')
      navigation.navigate('Login')
    } catch (err) {
      console.log('Error @setItem:', err)
    }
  }
};

const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX} } }],{
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      </View>
        <Paginator data={slides} scrollX={scrollX}/>
        <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)}/>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})