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
        navigation.navigate("JournalScreen")
    }

    return (
        <View style={styles.container}>

            <View style={styles.topRow}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('JournalScreen')}>
                    <Text style={styles.btnText}> Back </Text>
                </TouchableOpacity>
                <View style={styles.scoreHere}>
                    <Text style={styles.score}>{roundedHealthScore}</Text>
                </View>
            </View>


            <ScrollView>

                <View style={styles.GraphOverview}>

                    <BarChart
                        style={styles.chart}
                        data={data}
                        gridMin={0}
                        yAccessor={({ item }) => item.value}
                    />
                    <View style={styles.labels}>
                        <Text>Anger</Text>
                        <Text>Disgust</Text>
                        <Text>Fear</Text>
                        <Text>Joy</Text>
                        <Text>Sadness</Text>

                    </View>

                </View>
                <Text style={styles.EntryTitle}>{Entry.JournalEntry.title}</Text>
                <Text style={styles.Entry}>{Entry.JournalEntry.text}</Text>
                <Text style={styles.averageScore}>Your Average score for this entry is: {roundedHealthScore} </Text>
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
        marginTop: 40
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
    labels: {
        width: 305,
        height: 20,
        marginLeft: 10,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    btn: {
        height: 40,
        width: 60,
        backgroundColor: "#8B80F8",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: 'white',
        fontSize: 20
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30
    },
    scoreHere: {
        width: 50,
        height: 50,
        backgroundColor: "#8B80F8",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    score: {
        color: "white"
    }
})