import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  TextInput,
  Button,
  Title,
  ToggleButton,
  Checkbox,
  Image,
} from "react-native-paper";
import { TouchableRipple, IconButton } from "react-native-paper";
import SignInWithGoogle from "../../components/SignInWithGoogle";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import * as yup from "yup";
// import { getUserRole, loginCustomer, loginLabour } from '../../services/AuthService';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState(""); // Need to change the state named for email.
  const [password, setPassword] = useState(""); // state for password field.
  const [role, setRole] = useState(null); // state for save selected role.
  const [rememberMe, setRememberMe] = useState(false); // state for remember me button.
  const [errors, setErrors] = useState({});
  const [logError, setLogError] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye-slash");

  const schema = yup.object().shape({
    role: yup.string().required("Please select your role"),
    email: yup
      .string()
      .email("This is not a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(5, "Password can't be less than 5 letters")
      .required("Password can't be empty"),
  });

  const handleLogin = async () => {
    navigation.navigate("Home", { email });
    // try {
    //   await schema.validate({ email, password, role }, { abortEarly: false });
    //   const lowercasedEmail = email.toLowerCase();
    //   setErrors({});
    // } catch (error) {
    //   // Validation failed, set errors state.
    //   const validationErrors = {};
    //   error.inner.forEach((err) => {
    //     validationErrors[err.path] = err.message;
    //   });
    //   setErrors(validationErrors);
    // }

    // const options = {
    //   method: 'GET',
    //   url: 'https://searchbookpdf.p.rapidapi.com/search/publisher',
    //   params: {
    //     q: 'MCGraw-Hill Education '
    //   },
    //   headers: {
    //     'x-rapidapi-key': 'e07112fef8mshe887997e1436221p17f995jsn7d163e88f209',
    //     'x-rapidapi-host': 'searchbookpdf.p.rapidapi.com'
    //   }
    // };
    
    // try {
    //   const response = await axios.request(options);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-slash");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-slash") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password  pressed");
    navigation.navigate("ForgotPassword");
  };

  // customized default theme, need to finish later.
  const theme = {
    colors: {
      primary: "white",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          {/* App head tittle */}
          <Text
            style={{
              fontWeight: "600",
              fontSize: 40,
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Learn <Text style={{ color: "#F97300" }}>Mate</Text>
          </Text>
        </View>
        {/* App head sub tittle */}
        <Text style={styles.PageTitle}>Login to your account</Text>

        <View>
          {/* Login email field */}
          <Text>Email</Text>
          <TextInput
            theme={theme}
            outlineColor="transparent"
            underlineColor="transparent"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail} // this function name needed to change later.
            style={styles.input}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            //   label="Psw"
            theme={theme}
            underlineColor="transparent"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={passwordVisibility}
            style={styles.input}
            // error={errors.password}
          />

          {/* eye icon button */}
          <TouchableOpacity
            style={{
              marginTop: -50,
              marginLeft: 270,
            }}
            onPress={handlePasswordVisibility}
          >
            <Icon name={rightIcon} size={20} color="black" />
          </TouchableOpacity>
          {errors.password && (
            <Text style={[styles.error, { marginTop: 25 }]}>
              {errors.password}
            </Text>
          )}
        </View>
        <View style={styles.linksContainer}>
          {/* Forget password text button */}
          <TouchableRipple onPress={handleForgotPassword}>
            <Text style={styles.forgotPsw}>Forgot password?</Text>
          </TouchableRipple>
        </View>
        {/* remember me checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => setRememberMe(!rememberMe)}
            color="#F97300"
          />
          <Text>Remember me</Text>
        </View>
        {/* Login button */}
        {/* {errors.general && <Text style={styles.error}>{errors.general}</Text>}   */}
        {logError && <Text style={styles.error}>{logError}</Text>}
        <Button
          mode="contained"
          buttonColor="#FB9741"
          onPress={handleLogin}
          style={styles.button}
        >
          Login
        </Button>
        <SignInWithGoogle
          signText1="_or Sign in with_"
          signText2="Don't Have an account?"
          signState="Sign up"
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    justifyContent: "center",
    //   alignItems: 'center',
    paddingLeft: 50,
    width: "100%",
  },
  innerContainer: {
    marginTop: 90,
    width: "90%",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#EDEDEC",
    borderRadius: 20,
    // borderColor: "transparent",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  button: {
    width: "100%",
    color: "#F97300",
    marginVertical: 10,
  },
  PageTitle: {
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "400",
    fontSize: 15,
    // alignItems: 'center',
    width: "200",
  },
  toggleRoleContainer: {
    flex: 1,
    // marginBottom:700,
    justifyContent: "center",
    alignItems: "center",
  },
  innerToggleButtonContainer: {
    flexDirection: "row",
    // marginBottom: 20,
    marginTop: 20,
    marginLeft: 30,
  },
  toggleButtonContainer: {
    marginBottom: 20,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#F97300",
    // borderRadius: 5 ,
    marginRight: 10,
  },
  lButton: {
    width: 120,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
  },
  cButton: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  toggleButtonText: {
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: "#F97300",
  },
  activeButtonText: {
    color: "#fff",
  },

  forgotPsw: {
    // fontWeight: '600',
    fontSize: 12,
    color: "blue",
    // textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  linksContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  link: {
    // marginBottom: 10 ,
    color: "blue", // Change color to match hyperlink style
  },
  error: {
    color: "red",
  },
});
