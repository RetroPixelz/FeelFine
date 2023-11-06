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

    console.log(todayAverages)
    const handleTimePeriodChange = (newTimePeriod) => {
        setSelectedTimePeriod(newTimePeriod);
    };

    const getAveragesForTimePeriod = () => {
        switch (selectedTimePeriod) {
            case 'today':
                return todayAverages;
            case 'Yesterday':
                return yesterdayAverages;
            case 'thisWeek':
                return thisWeekAverages;
            default:
                return todayAverages;
        }
    };

    const currentAverages = getAveragesForTimePeriod();
    console.log(currentAverages)


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

    return (
        <>

            <View style={styles.container}>
                <View style={styles.filters}>
                    <TouchableOpacity style={styles.filter} onPress={() => handleTimePeriodChange('today')}>
                        <Text>
                            Today
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filter} onPress={() => handleTimePeriodChange('yesturday')}>
                        <Text>
                            Yesterday
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filter} onPress={() => handleTimePeriodChange('thisWeek')}>
                        <Text>
                            This week
                        </Text>
                    </TouchableOpacity>
                </View>


                {currentAverages && currentAverages ? (
                    <View style={styles.chart}>

                        <PieChart
                            data={data}
                            width={350}
                            height={200}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}

                        />


                    </View>
                ) : (

                    <View style={styles.loading}>
                        <Text>Loading...</Text>
                    </View>

                )}
            </View>
        </>

    );
};

export default EmotionAverages;


const styles = StyleSheet.create({
    filters: {
        flexDirection: "row",
        justifyContent: 'space-between',
        gap: 10
    },
    filter: {
        width: 100,
        height: 40,
        backgroundColor: "#AF8EFF",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
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
        marginTop: 50
    }

})