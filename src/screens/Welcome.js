import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Container, Content, Button } from "native-base";
import Swiper from "react-native-swiper";
import styles from "../../styles";

export default class Welcome extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Swiper>
        <View style={styles.container} showsButtons={false}>
          <Text style={styles.whiteTitle}>Welcome to Uni</Text>
          <Image source={require("../img/uni-logo.jpg")} style={styles.image} />
        </View>
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            For Students,this is where you can access all the class info here...
          </Text>
          <Button
            danger
            onPress={() => this.props.navigation.navigate("StudLogin")}
            style={styles.button}
          >
            <Text style={styles.white}>Get Started</Text>
          </Button>
        </View>
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            For Lecturers,this is where you can inform your students about all
            infos about the class.
          </Text>
          <Button
            danger
            onPress={() => this.props.navigation.navigate("LectLogin")}
            style={styles.button}
          >
            <Text style={styles.white}>Get Started</Text>
          </Button>
        </View>
      </Swiper>
    );
  }
}
