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
  const googleInfo = "";
  const [searchBar, setSearchBar] = useState(googleInfo);
  if (image) {
    callGoogleAPI();
  }
  async function callGoogleAPI() {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: "LABEL_DETECTION", maxResults: 10 },
            { type: "LANDMARK_DETECTION", maxResults: 5 },
            { type: "FACE_DETECTION", maxResults: 5 },
            { type: "LOGO_DETECTION", maxResults: 5 },
            { type: "TEXT_DETECTION", maxResults: 5 },
            { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
            { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
            { type: "IMAGE_PROPERTIES", maxResults: 5 },
            { type: "CROP_HINTS", maxResults: 5 },
            { type: "WEB_DETECTION", maxResults: 5 },
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

    const results = await response.json();

    console.log(results);
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
