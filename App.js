import { useState, useEffect } from "react";
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from "react-native";

let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=moviesbyearnings&format=json&case=default")
      .then((response) => response.json())
      .then((myJson) => {
        if (originalData.length < 1) {
          setMydata(myJson);
          originalData = myJson;
        }
      });
  }, []);

  const FilterData = (text) => {
    if (text !== "") {
      let myFilteredData = originalData.filter((item) =>
        item.Title.toLowerCase().includes(text.toLowerCase())
      );
      setMydata(myFilteredData);
    } else {
      setMydata(originalData);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.Title}</Text>
      <Text style={styles.text}>Year: {item.Year}</Text>
      <Text style={styles.text}>Gross: ${item.Gross}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Movies By Earnings (US)</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => FilterData(text)}
        placeholder="Search by title"
        placeholderTextColor="#888"
      />
      <FlatList
        data={mydata}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full screen usage
    backgroundColor: "#1e293b",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#facc15",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#64748b",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#334155",
    fontSize: 16,
    color: "#e2e8f0",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 70 , // Add extra padding at the bottom
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#475569",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#facc15",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#e2e8f0",
  },
});

export default App;
