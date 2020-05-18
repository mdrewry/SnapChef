import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Linking } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Recipe from "../components/Recipe";
import config from "../config";
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

function recipeListPage({ navigation, route }) {
  const { image } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  useEffect(() => {
    if (image) {
      callGoogleAPI();
    }
  }, []);
  async function callGoogleAPI() {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            {
              maxResults: 10,
              type: "OBJECT_LOCALIZATION",
            },
          ],
          image: {
            content: image,
          },
        },
      ],
    });

    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${config.googleVisionAPI.key}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      }
    );

    const result = await response.json();
    const resultArr = await result.responses[0].localizedObjectAnnotations;
    console.log(resultArr);
    resultArr
      .filter((obj) => {
        return (
          obj.name != "Packaged goods" &&
          obj.name != "Food" &&
          obj.name != "Vegetable"
        );
      })
      .map((obj) => {
        console.log(obj.name);
        setSearchBar(searchBar + obj.name);
      });
  }

  async function getRecipes() {
    await fetch(
      `https://api.edamam.com/search?q=${searchBar}&app_id=${config.edamamAPI.appID}&app_key=${config.edamamAPI.key}`
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
