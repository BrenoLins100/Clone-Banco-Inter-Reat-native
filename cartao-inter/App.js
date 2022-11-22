import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AppLoading from "expo-app-loading";
import Feather from "react-native-vector-icons/Feather";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export default () => {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const [numeroCartao, setNumeroCartao] = useState(0);

  const formatar = (valor)=>{

    if(valor.indexOf(' ') >=0){
      let removerEspaco = valor.replace(/^\s+|\s+$|\s+(?=\s)/g, "");;
      setNumeroCartao(removerEspaco);
    } else if(valor.indexOf('-')>=0){
      let removeTraco =  valor.replace(/-/g, "")
      setNumeroCartao(removeTraco);
    }
    else{
      const regex = /([0-9]{4})([0-9]{4})([0-9]{4})([0-9]{4})/gm;
      const str =  valor;
      const subst = `$1 $2 $3 $4`;
  
      const result = str.replace(regex, subst);
  
      setNumeroCartao(result)
    }

    


  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.main}>
        <View style={{ padding: 20 }}>
          <View style={styles.cartao}>
            <View style={styles.icones}>
              <Feather
                style={{ transform: [{ rotate: "45deg" }] }}
                name="rss"
                size={25}
                color="#fff"
              />
              <Feather name="credit-card" size={25} color="#fff" />
            </View>
            <View style={styles.number}>

              {numeroCartao === 0 ? (
                <>
                  <Text style={styles.numeroCartao}>0000 0000 0000 0000</Text>
                </>
              ) : (
                <>
                  <Text style={styles.numeroCartao}>{numeroCartao}</Text>
                </>
              )
            
            }

             

            </View>
            <View style={styles.titular}>
              <Text style={styles.placeholder}>Nome do titular</Text>
              <Text style={styles.nomeTitular}>BRENO LINS</Text>
            </View>
            <View style={styles.seguranca}>
              <View style={styles.exp}>
                <Text style={styles.placeholder}>Expiração</Text>
                <Text style={styles.nomeTitular}>01/30</Text>
              </View>

              <View style={styles.cvc}>
                <Text style={styles.placeholder}>CVC</Text>
                <Text style={styles.nomeTitular}>230</Text>
              </View>

              <View style={[styles.chip, { marginRight: 20 }]}>
                <Feather name="layout" size={25} color="#fff" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.entrada}>
          <Text style={styles.inputDados}>NÚMERO DO CARTÃO</Text>

          <TextInput keyboardType="numeric" maxLength={19} onChangeText={(e)=>{formatar(e)}} value={numeroCartao} style={styles.inputValor}></TextInput>

          <Text style={styles.inputDados}>NOME DO TITULAR</Text>
          <TextInput style={styles.inputValor}></TextInput>

          <View style={styles.inputSeg}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text style={styles.inputDados}>EXPIRAÇÃO</Text>
              <TextInput style={styles.inputValor}></TextInput>
            </View>

            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text style={styles.inputDados}>CVC</Text>
              <TextInput style={styles.inputValor}></TextInput>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnCad} >
          <Text style={styles.textoBtn} >ADICIONAR CARTÃO</Text>
        </TouchableOpacity>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  cartao: {
    backgroundColor: "#fa7700",
    marginTop: 50,
    borderRadius: 10,
  },
  icones: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  number: {
    margin: 20,
  },
  numeroCartao: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "Inter_600SemiBold",
  },
  titular: {
    margin: 20,
  },
  seguranca: {
    marginTop: 10,
    marginLeft: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholder: {
    fontFamily: "Inter_300Light",
    color: "#fff",
    fontSize: 11,
  },
  nomeTitular: {
    fontFamily: "Inter_500Medium",
    color: "#fff",
  },
  entrada: {
    margin: 20,
  },
  inputDados: {
    fontFamily: "Inter_500Medium",
    paddingBottom: 10,
    paddingTop: 10,
  },
  inputValor: {
    backgroundColor: "#dedfe4",
    borderRadius: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    fontFamily: "Inter_500Medium",
  },
  inputSeg: {
    paddingTop: 10,
    flexDirection: "row",
  },
  btnCad: {
    backgroundColor: "#fa7700",
    margin: 20,
    alignItems: "center",
    padding: 10,
    borderRadius: 3
  },
  textoBtn: {
    color: "#FFF",
    fontFamily: "Inter_500Medium",
  }
});
