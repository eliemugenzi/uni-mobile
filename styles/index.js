import { StyleSheet, Dimensions } from "react-native";
import colors from "../color-scheme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    color: colors.whiteColor,
    fontFamily: "JosefinSans-Thin",
    paddingLeft: "10%",
    paddingRight: "10%"
  },
  white: {
    color: colors.whiteColor,
    fontFamily: "JosefinSans-Thin"
  },
  whiteTitle: {
    color: colors.whiteColor,
    fontSize: 22,
    fontFamily: "JosefinSans-Bold",
    marginBottom: 20
  },
  card: {
    marginTop: 20,
    marginLeft: "10%",
    marginRight: "10%"
  },
  button: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8
  },
  paragraph: {
    color: colors.whiteColor,
    fontFamily: "JosefinSans-Thin",
    marginBottom: 20
  },
  input: {
    color: colors.whiteColor,
    fontFamily: "JosefinSans-Thin",
    marginBottom: 20
  }
});

export default styles;
