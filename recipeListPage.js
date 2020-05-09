import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  Linking,
} from "react-native";
import {
  TextInput,
  List,
  Button,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import Recipe from "./components/Recipe";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
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

function recipeListPage({ navigation }) {
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
  function visitRecipe(url) {
    Linking.openURL(url).catch((err) =>
      console.error("Failed loading page", err)
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.filter}
          value={searchBar}
          onChangeText={(info) => setSearchBar(info)}
        />
        <Button
          style={{
            backgroundColor: "#FFFFFF",
            height: "100%",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={(e) => getRecipes(e)}
        >
          Search
        </Button>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {recipes.map((r, i) => (
            <Recipe recipe={r.recipe} key={i} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default recipeListPage;
