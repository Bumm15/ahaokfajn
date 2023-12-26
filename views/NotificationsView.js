import { SafeAreaView, Text, View } from "react-native";

function NotoficationView() {
    /* TODO: connect to db: /notifications/uid
        type: 1 - new event
        viewedBy: names of users that have alredy seen, so don't show it again, instead show in older section
        content-newEvent:
            name
            etc...
        timeOfCreation
        validTime - for how long it will be valid, date?
        
    */
    return(
        <SafeAreaView>
            <Text style={{marginLeft: 15, fontSize: 20, marginBottom: 15}}>Nová oznámení</Text>

            {/* Component for new notification */}
            <View>
                <View className="rounded-md" style={{marginHorizontal: 15, shadowRadius: 10, backgroundColor: "#ffffff", borderRadius: 6}}>
                    <View style={{position: "absolute", height: 15, width: 15, borderRadius: "50%", top: -2, right:-2, backgroundColor:"#ff0000", borderColor: "#ffffff", borderWidth: 2}}></View>
                    <Text className="font-bold" style={{margin: 10, fontWeight: 500}}>Nová akce:</Text>
                    <View style={{marginLeft:10, marginBottom: 10}}>
                        <Text>Název: Neco Neco</Text>
                        <Text>Místo: tu a tam</Text>
                        <Text>Datum: 21.10.2023</Text>
                        <Text>Čas: 18:00</Text>
                    </View>
                    <View style={{flexDirection: "row", gap: 15, margin: 10}}>
                        <View style={{backgroundColor: "#90ee90", flex: 1, borderRadius: 6}}>
                            <Text onPress={() => console.log("ANO")} style={{padding:15}}>Můžu</Text>
                        </View>
                        <View style={{backgroundColor: "#FFCCCC", flex: 1, borderRadius: 6}}>
                            <Text onPress={() => console.log("NE")} style={{padding:15}}>Nemůžu</Text>
                        </View>
                    </View>

                </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginVertical: 25}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                        <Text style={{width: 150, textAlign: 'center'}}>Stará oznámení</Text>
                    </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>

            <View>
                <View className="rounded-md" style={{marginHorizontal: 15, shadowRadius: 10, height:80, backgroundColor: "#E2E2E2", borderRadius: 6}}>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NotoficationView