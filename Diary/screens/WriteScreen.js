import React from 'react';
import { StyleSheet, TextInput, View, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation'; 
//아이폰처럼 노치부분에 컴포넌트를 띄우지 않게 하겠다.
import {MaterialCommunityIcons} from '@expo/vector-icons';
import WriteHeader from '../components/WriteHeader';
import uuid from 'uuid/v1';
import *as ImagePicker from 'expo-image-picker';
import *as Permissions from 'expo-permissions';

const {width, height} = Dimensions.get('window');

export default class WriteScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <MaterialCommunityIcons name="lead-pencil" size={30} style={{color:tintColor}} />
    ),
    tabBarOnPress : ({navigation}) => {
      navigation.navigate('Write')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      inputtitle: '',
      inputcontent: '',
      imageUri: '',
    }
  }

  _changetitle = (value) => {
    this.setState({inputtitle : value})
  }

  _changeContent = (value) => {
    this.setState({inputcontent : value})
  }

  _gettoday = () => {
    tyear = (new Date().getFullYear()).toString()//시간 생성해서 년도를 글로 바꾸겠다
    tmonth = (new Date().getMonth()+1).toString()//시간 생성해서 월을 글로 바꾸겠다
    tday = (new Date().getDate()).toString()//시간 생성해서 일을 글로 바꾸겠다
    if(parseInt(tmonth) < 10){
      tmonth = '0' + tmonth;
    }
    if(parseInt(tday) < 10){
      tday = '0' + tday;
    }

    return (tyear + '-' + tmonth + '-' + tday)

  }

  _saveText = () => {
    if (this.state.inputtitle !== ''){
      const id = uuid()
      const date = this._gettoday()
      const newpost = {
        id : id,
        title : this.state.inputtitle,
        content : this.state.inputcontent,
        date : date,
        imageUri : this.state.imageUri,
      }
      this.setState(
        {
          inputtitle : '',
          inputcontent:'',
          imageUri : '',
        }
      )
      this.props.navigation.navigate('MainScreen',{myparam : newpost})
    }
    else{
      this.props.navigation.navigate('MainScreen')
    }
  }

  _selectImage = async () => {

    if (Constant.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      this.setState({ imageUri : result.uri});
    }
  };

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <WriteHeader saveProps={this._saveText} selectImage={this._selectImage} />
          <TextInput 
            value = {this.state.inputtitle}
            onChangeText={this._changetitle}

            placeholder="제목을 입력하세요"
            style={styles.title}
            returnKeyType="done" />
            {this.state.imageUri?
            <Image source={{uri: this.state.imageUri}} style={{width: 200, height: 200}} />:
            null
            }
          
          <TextInput 
            value = {this.state.inputcontent}
            onChangeText={this._changeContent}

            placeholder="내용을 입력하세요"
            multiline={true}
            style={styles.content}
            // returnKeyType = TextInput을 끝낼 Key의 type을 결정한다.
            returnKeyType="done" />
        </View>
      </SafeAreaView>
    )
  }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCEEFF',
    paddingTop: 50,
    alignItems: "center",
  },
  title: {
      fontSize: 40,
      color: '#BD2DCE',
  },
  contentContainer: {
    width: width - 60,
  },
  content: {
    fontSize: 20,
  },
});
