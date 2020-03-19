import React from "react";
import {
  TouchableHighlight,
  StyleSheet,
  KeyboardAvoidingView,
  View
} from "react-native";
import { Text, Input } from "react-native-elements";
import firebase from "./firebase";
import {connect} from "react-redux"
import {LoguearUsuario} from "./redux/store"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    margin: 14.5,
    width: "95%"
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      contraseña: ""
    };
  }

componentDidMount(){
  console.log("desde el store : " + this.props.logueado)
  
}


  handlerLoguearUsuario = () => {
    const { correo, contraseña } = this.state;
    if (!correo.length > 0  || !contraseña.length > 0 ) {
      alert("no se pudo loguear");
      return;
    }

    this.props.LoguearUsuario(correo,contraseña)

  };




  handlerCrearUsuario = () => {
    const correo = this.state.correo.trim();
    const contraseña = this.state.contraseña.trim();
    if (correo.length < 0 || contraseña.length < 0) {
      alert("no se pudo registrar");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(correo, contraseña)
      .then(usuario => {
        console.log(usuario);
        alert("se creo el usuario", usuario.user.email);
      })
      .catch(error => {
        console.log(error);
        alert("no se pudo crear el usaurio", error);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={{ backgroundColor: "tomato", padding: 10 }}>
          <Text>LOGUEADO : {true ? "no" : "si"}</Text>
        </View>
        <Input
          onChangeText={text => {
            this.setState({
              correo: text
            });
          }}
          label="Correo electronico"
          containerStyle={styles.input}
        />
        <Input
          onChangeText={text => {
            this.setState({
              contraseña: text
            });
          }}
          label="Contraseña"
          containerStyle={styles.input}
          secureTextEntry
        />
        <TouchableHighlight
          onPress={() => {
            this.handlerLoguearUsuario();
          }}
          style={styles.btnlogin}
        >
          <Text style={{ color: "white" }}>Iniciar Seccion</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            alert(
              `correo:${this.state.correo}, contraseña:${this.state.contraseña}`
            );
          }}
          style={styles.btnlogin}
        >
          <Text style={{ color: "white" }}>mostrar informacion</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            this.handlerCrearUsuario();
          }}
          style={styles.btnlogin}
        >
          <Text style={{ color: "white" }}>crear usuario</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}


function mapState(state){
  const {logueado} = state
  return {
    logueado
  }
}

const mapDispatch = (dispacth) => {
  return {
    LoguearUsuario : (correo, contraseña) => dispacth(LoguearUsuario(correo,contraseña))
  }
}


export default connect(mapState,mapDispatch)(Login)
