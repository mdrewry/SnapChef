import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Title } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    padding: 10,
    marginBottom: 50,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#393e46",
  },
  ingredients: {
    justifyContent: "flex-start",
    width: "80%",
  },
  filter: {
    width: "70%",
  },
});
function recipePage({ route, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={{ color: "#FFFFFF" }}>{route.params.recipe.label}</Title>
      </View>
      <Title style={{ textDecorationLine: "underline" }}> Ingredients </Title>
      <View style={styles.ingredients}>
        {route.params.recipe.ingredients.map((ingredient) => (
          <Text key={ingredient.text} style={{ fontSize: 10 }}>
            -{ingredient.text}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default recipePage;
