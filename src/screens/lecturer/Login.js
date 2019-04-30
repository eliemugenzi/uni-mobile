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

export default class LectLogin extends Component {
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
      email: "",
      password: "",
      loading: false
    };
  }
  login = () => {
    let { email, password } = this.state;
    if (!email || !password) {
      Toast.show("Each field is required!");
    } else {
      this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ loading: false });
          Toast.show("Logged In successfully");
        })
        .catch(err => {
          this.setState({ loading: false });
          Toast.show(err.message.toString());
        });
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Title style={styles.whiteTitle}>Keep Connected</Title>
          <Text style={styles.white}>
            Enter your Email and Password in order to stay connected.
          </Text>
          <Form style={styles.card}>
            <Item regular style={styles.input}>
              <Icon name="mail" style={styles.white} />
              <Input
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email Address"
                placeholderTextColor={colors.whiteColor}
                style={styles.white}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item regular style={styles.input}>
              <Icon name="key" style={styles.white} />
              <Input
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={colors.whiteColor}
                style={styles.white}
                maxLength={15}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Button danger style={styles.button} onPress={this.login}>
              <Text style={styles.white}>Log In</Text>
            </Button>
            {this.state.loading ? (
              <View
                style={{
                  marginHorizontal: "10%",
                  marginTop: 20,
                  marginBottom: 20
                }}
              >
                <BarIndicator animating={true} color="white" />
              </View>
            ) : null}
            <Text style={styles.paragraph}>Don't you have an account?</Text>
            <Button
              success
              style={styles.button}
              onPress={() => this.props.navigation.navigate("LectRegister")}
            >
              <Text style={styles.white}>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
