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
  Icon,
  Picker
} from "native-base";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import styles from "../../../styles";
import colors from "../../../color-scheme";

export default class StudRegister extends Component {
  constructor() {
    super();
    this.state = {
      department: "CSE1",
      names: "",
      email: "",
      password: "",
      confirm: "",
      loading: false
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.primaryColor,
      elevation: 0
    },
    headerTintColor: colors.whiteColor
  };
  createAccount = () => {
    let { department, names, email, password, confirm } = this.state;
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
          this.setState({ loading: false });
          firebase
            .database()
            .ref("Students/")
            .push({
              names,
              email,
              department,
              password
            })
            .then(data => {
              Toast.show("Account Created!");
            });
        })
        .catch(err => {
          Toast.show(err.message.toString());
          this.setState({ loading: false });
        });
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Title style={styles.whiteTitle}>Keep Connected</Title>
          <Text style={styles.white}>
            Create a student account in order to stay connected.
          </Text>
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
          <Form style={styles.card}>
            <Item regular style={styles.input}>
              <Icon name="person" style={styles.white} />
              <Input
                style={styles.white}
                returnKeyType="next"
                placeholder="Your Names"
                placeholderTextColor={colors.whiteColor}
                value={this.state.names}
                onChangeText={names => this.setState({ names })}
              />
            </Item>
            <Item regular style={styles.input}>
              <Icon name="mail" style={styles.white} />
              <Input
                keyboardType="email-address"
                returnKeyType="next"
                style={styles.white}
                placeholder="Email Address"
                placeholderTextColor={colors.whiteColor}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item regular style={styles.input}>
              <Icon name="people" style={styles.white} />
              <Picker
                selectedValue={this.state.department}
                onValueChange={value => this.setState({ department: value })}
                itemStyle={{ color: "#fff" }}
              >
                <Picker.Item value="CSE1" label="CSE1" />
                <Picker.Item value="CSE2" label="CSE2" />
                <Picker.Item value="CSE3" label="CSE3" />
                <Picker.Item value="CSE4" label="CSE4" />
              </Picker>
            </Item>
            <Item regular style={styles.input}>
              <Icon name="key" style={styles.white} />
              <Input
                secureTextEntry
                placeholder="Password"
                maxLength={15}
                returnKeyType="next"
                style={styles.white}
                placeholderTextColor={colors.whiteColor}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Item regular style={styles.input}>
              <Icon name="key" style={styles.white} />
              <Input
                secureTextEntry
                placeholder="Confirm Password"
                style={styles.white}
                placeholder="Confirm Password"
                placeholderTextColor={colors.whiteColor}
                maxLength={15}
                value={this.state.confirm}
                onChangeText={confirm => this.setState({ confirm })}
              />
            </Item>
            <Button danger style={styles.button} onPress={this.createAccount}>
              <Text style={styles.white}>Register</Text>
            </Button>
            
          </Form>
        </Content>
      </Container>
    );
  }
}
