import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { BarChart, XAxis } from 'react-native-svg-charts'

const EntryDetails = ({ route, navigation }) => {
    const { Entry } = route.params;
    const emotionsArray = Entry.JournalEntry.emotions;

    function calculateAverageMentalHealthScore(emotionsArray) {
        if (emotionsArray.length === 0) {
            console.log("nothing to calculate")
            return 0;
        }

        const totalScore = emotionsArray.reduce((accumulator, emotionObject) => {
            return accumulator + emotionObject.score;
        }, 0);
        console.log(totalScore)

        return totalScore / emotionsArray.length;
    }

    const averageScore = calculateAverageMentalHealthScore(emotionsArray);
    const roundedHealthScore = parseFloat(averageScore).toFixed(2);
    console.log('Average Mental Health Score:', averageScore);


    const data = emotionsArray.map(emotionObject => ({
        value: emotionObject.score,
        label: emotionObject.emotion,
        svg: {
            fill: '#8B80F8',
        },
    }));



    const back = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.back}>
                <Text onPress={back}>goback</Text>
            </View>

            <ScrollView>

                <Text style={styles.overview}>Entry overview</Text>
                

                <View style={styles.GraphOverview}>

                    <BarChart
                        style={styles.chart}
                        data={data}
                        gridMin={0}
                        yAccessor={({ item }) => item.value}
                    />

                </View>
                <Text style={styles.EntryTitle}>{Entry.JournalEntry.title}</Text>
                <Text style={styles.Entry}>{Entry.JournalEntry.text}</Text>
                <Text style={styles.averageScore}>Your Average score for this entry is: {roundedHealthScore} </Text>
                {/* <Text style={styles.averageScore}>{roundedHealthScore}</Text> */}
                <TouchableOpacity style={styles.Analyse} >
                    <Text style={styles.AnalyseText}>Delete Entry</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default EntryDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 25
    },
    back: {
        marginTop: 40,
        height: 50,
    },
    overview: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 0,

    },
    GraphOverview: {
        marginLeft: 20,
        marginTop: 25,
        width: 300,
        height: 200,
    },
    EntryTitle: {
        fontSize: 20,
        marginTop: 10
    },
    Entry: {
        marginTop: 15,
        height: 250
    },
    Analyse: {
        width: "100%",
        height: 45,
        backgroundColor: "#8B80F8",

        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    AnalyseText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold"
    },
    chart: {
        height: 200,
        width: 320,
    },
})