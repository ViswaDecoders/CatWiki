import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import Card from "../components/Cards";
import Screen from "../components/Screen";
import ListItemSeperatorComponent from "../components/list/ListItemSeperator";
import colors from "../config/colors";
import Pagination from "../components/Pagination";
import Headings from "../components/Heading";

import { Dropdown } from "react-native-element-dropdown";

let newCards;

function ListingScreen(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [bdata, setBdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  // console.log(data.items);

  let cardsLen;
  //Note: to use splice/length need to be specified in try catch or any type of validation to work
  try {
    cardsLen = data.length;
    // console.log(data.items.splice(1, 5));
  } catch (error) {}

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=100", {
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

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds", {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-api-key": "76a5d2c7-56cb-467f-bab9-541c1303b818",
      }),
    })
      .then((response) => response.json())
      .then((json) => setBdata(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(bdata);
  //Getting posts
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  let currentCards;
  if (newCards) currentCards = newCards;
  else {
    try {
      currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
    } catch (error) {
      console.log(error);
    }
  }

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          
        </Text>
      );
    }
    return null;
  };
  return (
    <>
      <Screen style={styles.screen}>
        {isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator />
            <Text style={styles.text}>Loading...</Text>
          </View>
        ) : (
          <>
            <Headings>CatWiki</Headings>
            <View style={styles.dcontainer}>
              {renderLabel()}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={bdata}
                search
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={!isFocus ? "Select item" : "..."}
                searchPlaceholder="Search..."
                value={name}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.name);
                  setIsFocus(false);
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <FlatList
                data={currentCards}
                keyExtractor={(datum) => datum.id.toString()}
                renderItem={({ item }) => (
                  <Card
                    id={item.id}
                    img={item.url}
                    desc={item.description}
                    owner={item.owner}
                    stars={item.stargazers_count}
                    forks={item.forks_count}
                    lang={item.language}
                    onPress={() => Linking.openURL(item.html_url)}
                  />
                )}
                ItemSeparatorComponent={ListItemSeperatorComponent}
              />
              <View style={{ alignSelf: "center", padding: 10 }}>
                Page Size: {cardsPerPage}
              </View>
              <Pagination
                cardsPerPage={cardsPerPage}
                totalCards={cardsLen}
                paginate={paginate}
              />
            </View>
          </>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.lightgrey,
  },
  dcontainer: {
    padding: 16,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "dodgerblue",
    fontSize: 30,
  },
  dropdown: {
    width: 320,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ListingScreen;
