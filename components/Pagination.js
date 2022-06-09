import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Linking,
  TouchableHighlight,
} from "react-native";
import colors from "../config/colors";

function Pagination({ cardsPerPage, totalCards, paginate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumber.push(i);
  }

  // console.log(pageNumber);
  const prevPage = () => {
    console.log("prev");
    if (pageNumber.includes(currentPage - 1)) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  const nextPage = () => {
    console.log("next");
    if (pageNumber.includes(currentPage + 1)) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={prevPage}>
        <Text style={styles.leftnright}>Prev</Text>
      </TouchableHighlight>
      <FlatList
        contentContainerStyle={styles.numberContainer}
        data={pageNumber}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => {
              setCurrentPage(item);
              paginate(item);
            }}
          >
            <View style={styles.element}>{item}</View>
          </TouchableHighlight>
        )}
      />
      <TouchableHighlight onPress={nextPage}>
        <Text style={styles.leftnright}>Next</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  numberContainer: {
    flexDirection: "row",
  },
  leftnright: {
    borderWidth: 1,
    borderColor: colors.black,
    padding: 5,
    maxWidth: 44,
    margin: 5,
    color: colors.green,
    fontWeight: "bold",
  },
  element: {
    borderWidth: 1,
    borderColor: colors.black,
    padding: 5,
    maxWidth: 22,
    margin: 5,
    color: colors.green,
    fontWeight: "bold",
  },
});

export default Pagination;
