import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, List, Button } from "react-native-paper";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    padding: 5,
    justifyContent: "space-between",
  },
  filter: {
    width: "70%",
  },
});

function recipeListPage(searchInput) {
  const [recipes, setRecipes] = useState([]);
  const [searchBar, setSearchBar] = useState(searchInput);
  async function getRecipes() {
    await fetch(
      `https://api.edamam.com/search?q=${searchBar}&app_id=${config.recipe.appID}&app_key=${config.recipe.key}`
    )
      .then((response) => {
        response.json().then((data) => setRecipes(data.hits));
      })
      .catch((error) => console.log(error.status));
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.filter}
          value={searchBar}
          onChangeText={(info) => setSearchBar(info)}
        />
        <Button onPress={(e) => getRecipes(e)}>Search</Button>
      </View>
      {recipes.map((r) => (
        <View key={r.recipe.label} style={{ flexDirection: "row" }}>
          <List.Item
            style={{ width: "80%" }}
            title={r.recipe.label}
          ></List.Item>
          <Image
            style={{ width: "20%" }}
            source={{ uri: r.recipe.image }}
          ></Image>
        </View>
      ))}
    </View>
  );
}

export default recipeListPage;
