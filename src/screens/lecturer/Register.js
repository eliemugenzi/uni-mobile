import React, { Component } from "react";
import firebase from "react-native-firebase";
import Toast from "react-native-simple-toast";
import { BarIndicator } from "react-native-indicators";
import {
  Container,
  Content,
  Button,
  Title,
  Item,
  Input,
  Form,
  Label,
  Icon
} from "native-base";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import styles from "../../../styles";
import colors from "../../../color-scheme";

export default class LectRegister extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.primaryColor,
      elevation: 0
    },
    headerTintColor: colors.whiteColor
  };
  constructor() {
    super();
    this.state = {
      names: "",
      email: "",
      password: "",
      confirm: "",
      loading: false
    };
  }
  crateAccount = () => {
    let { names, email, password, confirm } = this.state;
    if (!names || !email || !password || !confirm) {
      Toast.show("Each field is required!");
    } else if (password !== confirm) {
      Toast.show("Passwords must match!");
    } else {
      this.setState({ loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .database()
            .ref("Lecturers/")
            .push({
              names,
              email,
              password
            })
            .then(data => {
              Toast.show("User Created!");
              this.setState({ loading: false });
            })
            .catch(err => {
              Toast.show(err.message.toString());
              this.setState({ loading: false });
            })
            .catch(err => {
              Toast.show(err.message.toString());
              this.setState({ loading: true });
            });
        });
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Title style={styles.whiteTitle}>Keep Connected</Title>
          <Text style={styles.white}>
            Create a Lecturer account in order to stay connected.
          </Text>
          {this.state.loading ? (
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                marginHorizontal: "10%"
              }}
            >
              <BarIndicator animating={true} color="white" />
            </View>
          ) : null}
          <Form style={styles.card}>
            <Item regular style={styles.input}>
              <Icon name="person" style={styles.white} />
              <Input
                placeholder="Your Names"
                style={styles.white}
                placeholderTextColor={colors.whiteColor}
                returnKeyType="next"
              />
            </Item>
            <Item regular style={styles.input}>
              <Icon name="mail" style={styles.white} />
              <Input
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email Address"
                placeholderTextColor={colors.whiteColor}
                style={styles.white}
              />
            </Item>
            <Item regular style={styles.input}>
              <Icon name="key" style={styles.white} />
              <Input
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={colors.whiteColor}
                style={styles.white}
                returnKeyType="next"
              />
            </Item>
            <Item regular style={styles.input}>
              <Icon name="key" style={styles.white} />
              <Input
                placeholder="Confirm Password"
                placeholderTextColor={colors.whiteColor}
                returnKeyType="go"
                style={styles.white}
              />
            </Item>
            <Button danger style={styles.button} onPress={this.crateAccount}>
              <Text style={styles.white}>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
