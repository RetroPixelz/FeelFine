import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BarChart, Grid } from 'react-native-svg-charts'
// import * as shape from 'd3-shape'

const EntryDetails = ({ route, navigation }) => {
    const { Entry } = route.params;
    // console.log(Entry)

    const GraphData = Entry.JournalEntry.emotions
    console.log(GraphData)

    const fill = 'rgb(160, 65, 244)'
    const data = GraphData

    const back = () => {
        navigation.goBack()
    }

  return (
    <View style={styles.container}>
        <View style={styles.back}>
        <Text  onPress={back}>goback</Text>
        </View>
        
    <ScrollView>
        
        <Text style={styles.overview}>Entry overview</Text>
        <View style={styles.GraphOverview}>
        <BarChart style={{ height: 200 }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
                
            </BarChart>
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
        // alignItems: 'center', // Center horizontally
        padding: 25
      },
      back:{
        marginTop: 40,
        height: 50,
        // backgroundColor:"red"
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
        // backgroundColor: 'red'
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
      }
})