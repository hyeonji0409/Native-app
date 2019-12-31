import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import MainScreen from './screens/MainScreen';
import WriteScreen from './screens/WriteScreen';
import DetailScreen from './screens/DetailScreen';
import {MaterialCommunityIcons} from '@expo/vector-icons';

//Screen 객체의 묶음
const BaseNavi = createBottomTabNavigator ({
  MainScreen : {
    screen : MainScreen,
  },
  DetailScreen : {
    screen : DetailScreen,
  },
  WriteScreen : {
    screen : WriteScreen,
  },
  
},
{
  tabBarOptions : {
    showLabel: false //Icon만 나타나게 할 수 있다.
  }
})

const BaseNavi2 = createStackNavigator(

  {
    Write : WriteScreen, //Write라는 이름이 사용되면 WriteScreen을 사용한다
    Tab : BaseNavi,
    Detail : DetailScreen,
  },
  {
    initialRouteName: 'Tab', //처음 보여줄 Page
    mode : 'modal', //아이폰 유저는 설정하기
    headerMode: 'none', 
    //header모드 없이 설정하면 screen위에 header가 생성되는 것을 볼 수 있음.
    //기본 생성 header에 뒤로가기가 있는데 따로 만들 예정이니 none으로 설정한다.
  }
)

//Navigator를 하나 만들고 위에 있는 것들을 App.js에 넣기 힘들어서 하나에 묶어서 MyNavi라고 선언
//BaseNavi2로 하면 BaseNavi도 같이 포함된다.
const MyNavi = createAppContainer(BaseNavi2)

export default function App() {
    return (
      <View style={styles.container}>
        <MyNavi />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
