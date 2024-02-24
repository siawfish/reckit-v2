import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import StackNavigation from './navigation/StackNavigation';
import {PersistedStore, Store} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux'
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={PersistedStore}>
        <StatusBar style="auto" />
        <StackNavigation />
      </PersistGate>
    </Provider>
  );
}