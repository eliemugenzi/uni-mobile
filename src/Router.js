import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import Welcome from "./screens/Welcome";
import LectLogin from "./screens/lecturer/Login";
import StudLogin from "./screens/student/Login";
import LectRegister from "./screens/lecturer/Register";
import StudRegister from "./screens/student/Register";
const Stack = createStackNavigator({
  Welcome,
  StudLogin,
  LectLogin,
  LectRegister,
  StudRegister
});
import React, { Component } from "react";
export default class Router extends Component {
  render() {
    return <Stack />;
  }
}
