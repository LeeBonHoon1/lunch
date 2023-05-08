import React from 'react';
import {Button, View} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {StackActions} from '@react-navigation/native';

export default function WebviewContainer({navigation, route}) {
  console.log(route, '<<route');
  const targetUrl = 'https://naver.com';
  const url = route.params?.url ?? targetUrl;

  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);
    if (nativeEvent?.type === 'ROUTER_EVENT') {
      const path: string = nativeEvent.data;
      if (path === 'back') {
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
      } else {
        const pushAction = StackActions.push('Details', {
          url: `${targetUrl}${path}`,
          isStack: true,
        });
        navigation.dispatch(pushAction);
      }
    }
  };
  console.log(url);

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{uri: url}}
        onMessage={requestOnMessage}
      />
      <Button
        title="GO"
        onPress={() => {
          let action = StackActions.push('Home', {
            url: `https://google.com`,
            isStack: true,
          });
          if (url === 'https://google.com') {
            action = StackActions.pop(1);
          }
          navigation.dispatch(action);
        }}
      />
    </View>
  );
}
