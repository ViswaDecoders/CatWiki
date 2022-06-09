import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function Cards({ id, desc, owner, stars, forks, lang, onPress, img }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?breed_id=7b", {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-api-key": "76a5d2c7-56cb-467f-bab9-541c1303b818",
      }),
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <TouchableHighlight underlayColor={colors.lightgrey} onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailedContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            <Image
              source={{ uri: img }}
              style={{ width: "200px", height: "200px" }}
            />
          </AppText>

          {/* <AppText style={styles.subTitle} numberOfLines={2}>
            <AppText>Description: </AppText> {desc}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={1}>
            <AppText>Owner name: </AppText> {owner}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={1}>
            <AppText>Stars count: </AppText>
            {stars}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={1}>
            <AppText>Number of forks: </AppText>
            {forks}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={1}>
            <AppText>Language: </AppText>
            {lang}
          </AppText> */}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    margin: 15,
  },
  detailedContainer: {
    padding: 20,
  },
  subTitle: {
    color: colors.secondary,
  },
  title: {
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    backgroundColor: colors.lightblue,
    fontWeight: "bold",
    color: colors.darkpink,
  },
});

export default Cards;
