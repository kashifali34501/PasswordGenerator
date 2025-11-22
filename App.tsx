import { StyleSheet, Text, View,ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { use, useState } from 'react'
import * as Yup from 'yup'

import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = Yup.object().shape({
  PasswprdLength: Yup.number()
  .min(4, 'Password length should be at least 4 characters')
  .max(16, 'Password length should not exceed 20 characters')
  .required('Password length is required')
})
export default function App() {

  const [Password, setPassword]= useState('');
  const [ispassGenerated, setIsPassGenerated]= useState(false);
  const [lowercase, setLowercase]= useState(true);
  const [uppercase, setUppercase]= useState(false);
  const [numbers, setNumbers]= useState(false);
  const [symbols, setSymbols]= useState(false);

  const genratepasswordString = (PasswprdLength: number) => {
    //
    let CharaterList = '';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (lowercase){
      CharaterList += lowercase
    }
    if (uppercase){
      CharaterList += uppercase
    }
    if (numbers){
      CharaterList += numbers
    }
    if (symbols){
      CharaterList += symbols
    }

    const passwordResult= createpassword(CharaterList, PasswprdLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  
  }
  const createpassword = ( characters: string, PasswprdLength:number) => {

    let result = '';
    for (let i = 0; i < PasswprdLength; i++) {
      const charactersIndex= Math.floor(Math.random() * characters.length);
      result += characters.charAt(charactersIndex);
    }
    return result;
  }

  const resetpasswordstate = () => {
    //
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
    setIsPassGenerated(false);
    setPassword('');
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>

      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Text style={styles.description}>Create a strong and secure password to protect your accounts and data.</Text>
               <Formik
       initialValues={{PasswprdLength: ''}}
       validationSchema={passwordSchema}
       onSubmit={values => {
          genratepasswordString(Number(values.PasswprdLength));
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.PasswprdLength && errors.PasswprdLength && (
              <Text style={styles.errorText}>
                {errors.PasswprdLength}
              </Text>
            )}
          </View>
           <TextInput 
            style={styles.inputStyle}
            value={values.PasswprdLength}
            onChangeText={handleChange('passwprdLength')}
            placeholder="Ex. 8"
            keyboardType= 'numeric'
            />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Lowercase Letters</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={lowercase}
          onPress={()=> (setLowercase(!lowercase))}
          fillColor='#29AB87'
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Uppercase Letters</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={uppercase}
          onPress={()=> (setUppercase(!uppercase))}
          fillColor='#29AB87'
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Numbers</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={numbers}
          onPress={()=> (setNumbers(!numbers))}
          fillColor='#29AB87'
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Symbols</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={symbols}
          onPress={()=> (setSymbols(!symbols))}
          fillColor='#29AB87'
          />
         </View>

          <View style={styles.formActions}>
          <TouchableOpacity
          style={styles.primaryBtn}
          disabled={!isValid}
          onPress={()=> handleSubmit()}
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={()=>{
            handleReset();
            resetpasswordstate();
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
          </View>
         </>
         
       )}
     </Formik>
        </View>
        {ispassGenerated ? (
          <View style={styles.generatedPassword}>
            <Text style={styles.inputStyle}>Test</Text>
          </View>
        ) : null}

      </SafeAreaView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  }
})