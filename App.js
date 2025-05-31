import React, { useEffect,useState, useContext } from "react";
import { View,Text } from 'react-native';
import { GlobalProvider } from './global/GlobalState';
import { GlobalCarteProvider } from "./global/GlobalCarte";
import Routes from './routes';


export default function App({navigation}) {
  return (
    
        <View style={{flex:1}}>
          <GlobalProvider>
      <GlobalCarteProvider>
        <Routes/>
       </GlobalCarteProvider>
    </GlobalProvider>
    
        </View>
      
  );
}

