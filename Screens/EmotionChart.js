// EmotionAverages.js
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const EmotionAverages = ({ todayAverages, yesterdayAverages, thisWeekAverages }) => {
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('today');
    
    console.log("T",todayAverages)
    console.log("Y",yesterdayAverages)
    console.log("W", thisWeekAverages)


    // console.log(todayAverages)
    const handleTimePeriodChange = (newTimePeriod) => {
        setSelectedTimePeriod(newTimePeriod);
    };

    const getAveragesForTimePeriod = () => {
        switch (selectedTimePeriod) {
            case 'today':
                return todayAverages;
            case 'yesterday':
                return yesterdayAverages;
            case 'thisWeek':
                return thisWeekAverages;
            default:
                return todayAverages;
        }
    };

    const currentAverages = getAveragesForTimePeriod();
    // console.log(currentAverages)


    const data = [
        {
            name: "Anger",
            population: currentAverages?.anger,
            color: "#9F2121",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Disgust",
            population: currentAverages?.disgust,
            color: "#E39147",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Fear",
            population: currentAverages?.fear,
            color: "#9B5FC0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Joy",
            population: currentAverages?.joy,
            color: "#66D26B",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Sadness",
            population: currentAverages?.sadness,
            color: "#61AED9",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];


    const chartConfig = {
        backgroundGradientFrom: "#F5F6FA",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#F5F6FA",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 1,
        useShadowColorFromDataset: false
    };

    const noEntries = currentAverages && Object.values(currentAverages).every(value => value === 0);


    return (
        <>

            <View style={styles.container}>


                {noEntries ? (
                    <View style={styles.noEntriesMessage}>
                        <Text style={styles.noEntriesMessageText}>No entries for this date</Text>
                    </View>
                ) : (
                    <View style={styles.chart}>
                        <PieChart
                            data={data}
                            width={350}
                            height={200}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                        />
                    </View>
                )}
            </View>
            <View style={styles.filters}>
                <TouchableOpacity
                    style={[styles.filter, selectedTimePeriod === 'today' ? styles.activeFilter : styles.inactiveFilter]}
                    onPress={() => handleTimePeriodChange('today')}>
                    <Text style={styles.FilterText}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filter, selectedTimePeriod === 'yesterday' ? styles.activeFilter : styles.inactiveFilter]}
                    onPress={() => handleTimePeriodChange('yesterday')}>
                    <Text style={styles.FilterText}>Yesterday</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filter, selectedTimePeriod === 'thisWeek' ? styles.activeFilter : styles.inactiveFilter]}
                    onPress={() => handleTimePeriodChange('thisWeek')}>
                    <Text style={styles.FilterText}>This week</Text>
                </TouchableOpacity>

            </View>
        </>

    );
};

export default EmotionAverages;


const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    filters: {
        flexDirection: "row",
        justifyContent: 'space-between',
        gap: 10,
        width: 300,
        marginTop: 20,
        // backgroundColor: "red"
    },
    filter: {
        width: 100,
        height: 30,
        backgroundColor: "#AF8EFF",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    activeFilter: {
        backgroundColor: "#AF8EFF", // Style for the active button
    },
    inactiveFilter: {
        backgroundColor: "#FFFFFF", // Style for the inactive buttons
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#AF8EFF"
    },
    loading: {
        width: 100,
        height: 100,
        backgroundColor: "#AF8EFF",
        marginLeft: 110,
        marginTop: 25,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    chart: {
        marginTop: 20
    },
    noEntriesMessage: {
        height: 200,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
       

    },
    noEntriesMessageText: {
        fontFamily: 'MontserratRegular',
    },
    FilterText: {
        fontFamily: 'MontserratRegular',
        fontSize: 12,
        
        // color: "white"
    }

})