import React, { useEffect } from 'react';
import Route from './app/navigation';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './app/Redux/Store';
import { apiCall, setDefaultHeader } from 'app/components/utilities/httpClient';
// import { jwtTokenGenrate } from 'app/Redux/Actions/AuthActions';
import apiEndPoints from 'app/components/utilities/apiEndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  // const dispatch: any = useDispatch();
  // const loginSelector = useSelector((state: any) => state.login);
  // useEffect(() => {

  //   // const authval = AsyncStorage.getItem("AuthToken");
  //   // const authval = AsyncStorage.removeItem("AuthToken");
  //   // console.log('authval: vv', authval);
  //   tokenGenrate()
  //   // if (loginSelector.response == null ) {
  //   //    tokenGenrate()
  //   // } else {
  //   //   setDefaultHeader("token", loginSelector?.response?.token);
  //   // }

  // }, [])

  // async function tokenGenrate() {

  //   // dispatch(jwtTokenGenrate())
  //   try {
  //     const { data } = await apiCall("get", apiEndPoints.JWTTOKEN, {});
  //     console.log('data: ', data);
  //     if (data) {
  //       await AsyncStorage.setItem("token", data.token);
  //       await setDefaultHeader("token", data.token);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
