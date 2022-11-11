import { Alert } from 'react-native';
import {
    request,
    PERMISSIONS,
    RESULTS,
    openSettings,
    check,
  } from 'react-native-permissions';
import { Isios } from './constant';
import strings from './Localization';

export const handlePermission = async (
    permission: any,
    msgHeading = 'Permission',
    message = 'txt_setting_access',
  ) => {
    let result: any = '';
    switch (permission) {
      case 'camera':
        result = await check(
          Isios ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
        );
        break;
      case 'gallery':
        result = await check(
          Isios
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        break;
      case 'microPhone':
        result = await check(
            Isios ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO,
        );
        break;
      case 'write':
        result = permissionWrite('check');
        break;
    }
    let res: any = false;
    switch (await result) {
      case RESULTS.UNAVAILABLE:
        res = requestPermission(permission, msgHeading, message);
        break;
      case RESULTS.DENIED:
        res = requestPermission(permission, msgHeading, message);
        break;
      case RESULTS.LIMITED:
        res = true;
        break;
      case RESULTS.GRANTED:
        res = true;
        break;
      case RESULTS.BLOCKED:
        res = 'setting1';
        // openPermissionSetting(msgHeading, message);
        break;
    }
    return await res;
  };

  export const permissionWrite = async (type = 'request') => {
    const res = (type = 'request'
      ? await request(
          Isios
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        )
      : await check(
          Isios
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ));
    return res;
  };
  export const checkPermissions = async (permission: any) => {
    let result = '';
    switch (permission) {
      case 'camera':
        result = await check(
          Isios ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
        );
        break;
      case 'gallery':
        result = await check(
          Isios
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        break;
    }
    let res: any = false;
    switch (await result) {
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.DENIED:
        res = 'denied';
        break;
      case RESULTS.LIMITED:
        res = true;
        break;
      case RESULTS.GRANTED:
        console.log('RESULTS.GRANTED: ', RESULTS.GRANTED);
        res = true;
        break;
      case RESULTS.BLOCKED:
        res = 'setting1';
        break;
    }
    return await res;
  };
export  const requestPermission = async (permission: any, msgHeading: any, message: any) => {
    let reqRes: any = '';
    switch (permission) {
      case 'camera':
        reqRes = await request(
          Isios ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
        );
        break;
      case 'gallery':
        reqRes = await request(
          Isios
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        break;
        case 'microPhone':
          reqRes = await request(
            Isios
              ?PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO,
          );
          break;
      case 'write':
        reqRes = permissionWrite();
        break;
    }
    let res: any = false;
    switch (await reqRes) {
      case RESULTS.UNAVAILABLE:
        //  openPermissionSetting(msgHeading, message);
        break;
      case RESULTS.DENIED:
        res = false;
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.GRANTED:
        res = true;
        break;
      case RESULTS.BLOCKED:
        res = 'setting1';
        break;
    }
    return await res;
  };
  export const requestPermissions = async (permission: any) => {
    let reqRes = '';
    switch (permission) {
      case 'camera':
        reqRes = await request(PERMISSIONS.ANDROID.CAMERA);
        break;
      case 'gallery':
        reqRes = await request(
          Isios
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        break;
      case 'write':
        reqRes = await permissionWrite();
        break;
    }
    let res: any = false;
    switch (reqRes) {
      case RESULTS.UNAVAILABLE:
        //  openPermissionSetting(msgHeading, message);
        break;
      case RESULTS.DENIED:
        res = false;
        break;
      case RESULTS.LIMITED:
        res = true;
        break;
      case RESULTS.GRANTED:
        res = true;
        break;
      case RESULTS.BLOCKED:
        // res = 'setting2';
        res = false;
        // openPermissionSetting(
        //   'Camera & Media Permission',
        //   strings.txt_setting_media_camera,
        // );
        break;
    }
    return await res;
  };

  export const openPermissionSetting = (msgHeading: any, message: any ,onPressCancel=()=>{console.log(' cancel presed')} ) => {
  console.log('message: ', message);
  console.log('msgHeading: ', msgHeading);
    Alert.alert(msgHeading, message, [
      {
        text: 'Not Now',
        onPress: () => onPressCancel(),
        style: 'cancel',
      },
      {text: 'Settings', onPress: () => openSettings()},
    ]);
  };