import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { TextInput, List, Button, Card, Title } from "react-native-paper";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#393e46",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    padding: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  filter: {
    width: "70%",
  },
});

function recipeListPage(props) {
  const [recipes, setRecipes] = useState([]);
  const googleInfo = "";
  const [searchBar, setSearchBar] = useState(googleInfo);
  const config = {};
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {recipes.map((r) => (
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              margin: 10,
              borderRadius: 5,
              backgroundColor: "#222831",
            }}
            key={r.recipe.label}
          >
            <Image
              style={{ width: 200, height: 150, borderRadius: 5 }}
              source={{ uri: r.recipe.image }}
            />
            <View
              style={{
                marginLeft: 5,
                width: 100,
                height: 150,
                alignItems: "center",
                borderRadius: 5,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Text style={{ fontSize: 10 }}>{r.recipe.label}</Text>
              <Text style={{ fontSize: 8 }}>
                {parseInt(r.recipe.calories)} calories
              </Text>
              <Text style={{ fontSize: 8, textDecoration: "underline" }}>
                Ingredients
              </Text>
              {r.recipe.ingredients.map((ingredient) => (
                <Text key={ingredient.text} style={{ fontSize: 5 }}>
                  {ingredient.text}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default recipeListPage;
