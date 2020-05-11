import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  Linking,
} from "react-native";
import { Title, Paragraph } from "react-native-paper";
import LinkImage from "../helpers/link.png";

function Recipe({ recipe, i }) {
  function visitRecipe(url) {
    Linking.openURL(url).catch((err) =>
      console.error("Failed loading page", err)
    );
  }
  return (
    <TouchableHighlight
      onPress={() => {
        visitRecipe(recipe.url);
      }}
      key={i}
      style={{
        width: "80%",
        alignItems: "center",
        margin: 10,
        borderRadius: 10,
      }}
    >
      <ImageBackground
        style={{
          width: "100%",
          height: 300,
        }}
        source={{ uri: recipe.image }}
      >
        <View style={{ backgroundColor: "#FFFFFF80", height: "100%" }}>
          <Title
            style={{
              marginLeft: 5,
              fontSize: 12,
            }}
          >
            {recipe.label}
          </Title>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Title
              style={{
                textDecorationLine: "underline",
                fontSize: 10,
                marginLeft: 10,
              }}
            >
              Calories:
            </Title>
            <Title style={{ fontSize: 10 }}> {parseInt(recipe.calories)}</Title>
          </View>
          <Title
            style={{
              textDecorationLine: "underline",
              fontSize: 10,
              marginLeft: 10,
            }}
          >
            Main Ingredients
          </Title>
          {recipe.ingredients.splice(0, 4).map((ingredient, i) => (
            <Paragraph
              key={i}
              lineBreakMode={true}
              style={{ fontSize: 10, marginLeft: 15 }}
            >
              {ingredient.text}
            </Paragraph>
          ))}

          <View flex={1} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              zIndex: 5,
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                marginBottom: 10,
                marginRight: 10,
              }}
              source={LinkImage}
            ></Image>
          </View>
        </View>
      </ImageBackground>
    </TouchableHighlight>
  );
}

export default Recipe;
