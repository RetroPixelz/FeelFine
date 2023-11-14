import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-svg-charts'


const EntryDetails = ({ route, navigation }) => {
    const { Entry } = route.params;
    const emotionsArray = Entry.JournalEntry.emotions;

    function calculateAverageMentalHealthScore(emotionsArray) {
        if (emotionsArray.length === 0) {
            console.log("No emotions to calculate");
            return 0;
        }

        const totalScore = emotionsArray.reduce((accumulator, emotionObject) => {
            if (typeof emotionObject.score === 'number' && !isNaN(emotionObject.score)) {
                return accumulator + emotionObject.score;
            } else {
                console.log("Invalid emotion score:", emotionObject.score);
                return accumulator; 
            }
        }, 0);

        return totalScore / emotionsArray.length;
    }

    const averageScore = calculateAverageMentalHealthScore(emotionsArray);
    const roundedHealthScore = parseFloat(averageScore).toFixed(2);
    console.log('Average Mental Health Score:', averageScore);

    const data = emotionsArray.map(emotionObject => ({
        value: typeof emotionObject.score === 'number' && !isNaN(emotionObject.score) ? emotionObject.score : 0,
        label: emotionObject.emotion,
        svg: {
            fill: '#8B80F8',
        },
    }));

    



    return (
        <View style={styles.container}>

            <View style={styles.topRow}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('JournalScreen')}>
                    <Image
                        source={require('../assets/return.png')}
                        style={styles.symbol}
                    />
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
                        <Text style={styles.label}>Anger</Text>
                        <Text style={styles.label}>Disgust</Text>
                        <Text style={styles.label}>Fear</Text>
                        <Text style={styles.label}>Joy</Text>
                        <Text style={styles.label}>Sadness</Text>

                    </View>

                </View>
                <Text style={styles.EntryTitle}>{Entry.JournalEntry.title}</Text>
                <Text style={styles.Entry}>{Entry.JournalEntry.text}</Text>
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
        marginTop: 40,
        fontFamily: 'MontserratBold',

    },
    Entry: {
        marginTop: 15,
        height: 250,
        fontFamily: 'MontserratRegular',
        fontSize: 13

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
        width: 300,
        height: 20,
        marginLeft: 10,
        justifyContent: "space-between",
        flexDirection: "row",
    
    },
    label: {
        fontFamily: 'MontserratRegular',
        fontSize: 12,
        marginLeft: 0,
        width: 50,
        textAlign: "center"
    },
    btn: {
        height: 30,
        width: 30,
        backgroundColor: "#8B80F8",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    btnText: {
        color: 'white',
        fontSize: 15
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
        color: "white",
        fontFamily: 'MontserratRegular',
        fontSize: 18

    },
    symbol: {
        width: 10,
        height: 10
    }
})