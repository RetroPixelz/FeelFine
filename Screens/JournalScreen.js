import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getCurrentUser } from '../Services/firebaseAuth';
import { GetUserEntries } from '../Services/firebasedb';


const JournalScreen = ({ navigation }) => {
    const [AllEntries, setAllEntries] = useState([]);
    const [uid, setUid] = useState();

    useEffect(() => {
        const user = getCurrentUser();

        if (user) {
            setUid(user.uid);
        }
    }, []);

    const getEntries = async () => {
        try {
            console.log("Getting data");
            const UserEntries = await GetUserEntries(uid);

            setAllEntries(UserEntries);

        } catch (error) {
            console.log(error);
        }
    };

    const getColorForEmotion = (entry) => {
        if (entry.JournalEntry.emotions && entry.JournalEntry.emotions.length > 0) {
            const highestEmotion = entry.JournalEntry.emotions.reduce((maxEmotion, emotion) => {
                return emotion.score > maxEmotion.score ? emotion : maxEmotion;
            }, entry.JournalEntry.emotions[0]);


            if (highestEmotion.emotion === 'anger') {
                return '#9F2121';
            } else if (highestEmotion.emotion === 'disgust') {
                return '#E39147';
            } else if (highestEmotion.emotion === 'fear') {
                return '#9B5FC0';
            } else if (highestEmotion.emotion === 'joy') {
                return '#66D26B';
            } else if (highestEmotion.emotion === 'sadness') {
                return '#61AED9';
            }
            else {
                return '#8B80F8';
            }
        } else {
            return '#8B80F8';
        }
    };





    return (
        <View style={styles.testing}>
            <View style={styles.ToEntry}>
                <TouchableOpacity onPress={getEntries} style={styles.button}>
                    <Text style={styles.refresh}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Journal')}>
                    <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
            </View>


            <ScrollView style={styles.YourEntries} contentContainerStyle={{ alignItems: 'center' }}>
                {AllEntries.map((Entry, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate("EntryDetails", { Entry })} activeOpacity={0.75}>
                        <View style={styles.Entry}>
                            <View style={[styles.EntryBlock, { backgroundColor: getColorForEmotion(Entry) }]}></View>
                            <View style={styles.EntryTextBlock}>
                                <Text>{Entry.JournalEntry.title}</Text>
                                <Text style={styles.EntryThumbnail}>
                                    {Entry.JournalEntry.text
                                        ? Entry.JournalEntry.text.split(' ').slice(0, 10).join(' ')
                                        : ''}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}


            </ScrollView>

        </View>
    )
}

export default JournalScreen

const styles = StyleSheet.create({
    testing: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "space-between",
        paddingTop: 20
    },
    ToEntry: {
        width: 350,
        height: 40,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    btn: {
        height: 40,
        width: 40,
        backgroundColor: "#8B80F8",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: 'white',
        fontSize: 20
    },
    YourEntries: {
        width: 350,
        backgroundColor: "#F5F6FA",
        marginTop: 25,
        paddingTop: 15,
        marginBottom: 50,
        borderRadius: 15,
        height: 600
    },
    Entry: {
        width: 300,
        height: 70,
        backgroundColor: "white",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        marginBottom: 15
    },
    EntryBlock: {
        height: 50,
        width: 60,
        backgroundColor: "#8B80F8",
        borderRadius: 15,
    },
    EntryTextBlock: {
        height: 50,
        width: 200,
        marginLeft: 10
    },
    button: {
        width: 250,
        height: 40,
        marginRight: 60,
        backgroundColor: "#AF8EFF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    refresh: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white"
    }

})