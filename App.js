import Bugsnag from '@bugsnag/expo';

Bugsnag.start();
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import StackNavigation from './navigation/StackNavigation';
import {PersistedStore, Store} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux'
const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const ErrorView = () =>
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text
      style={{
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Open-Sans',
      }}
    >
      Sorry, something terribly bad happened.
    </Text>
  </View>

  // report test error with bugsnag
  Bugsnag.notify(new Error('Test error'))

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={PersistedStore}>
          <StatusBar style="auto" />
          <StackNavigation />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}