import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import {connect} from "react-redux"
import {CerrarSeccion} from "./redux/store"
import firebase from "./firebase"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnlogin: {
    marginTop: 10,
    backgroundColor: "black",
    height: 30,
    padding: 25,
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10
  }
});

 class Dasboard extends React.Component {
  constructor(props) {
    super(props);
  }

componentDidMount(){
  console.log(firebase.auth().currentUser.email)
}


  render() {
    return (
      <>
        <View style={{ backgroundColor: "tomato", padding: 10 }}>
          <Text>LOGUEADO : {this.props.logueado ? "SI" : "NO"}</Text>
        </View>
        <View style={styles.container}>
          <Text> {this.props.user} </Text>
        </View>
        <TouchableHighlight
          onPress={() => {
            this.props.CerrarSeccion();
          }}
          style={styles.btnlogin}
        >
          <Text style={{ color: "white" }}>cerrar seccion</Text>
        </TouchableHighlight>
      </>
    );
  }
}


const mapState = (state) => {
  const {user, logueado} =  state
  return {
    user,logueado
  }
}

const mapDispacth = (dispacth) => {
  return {
    CerrarSeccion: () => dispacth(CerrarSeccion())
  }
}

export default connect(mapState,mapDispacth)(Dasboard)


