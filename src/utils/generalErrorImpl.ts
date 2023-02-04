import {Alert} from 'react-native/types';
import {GeneralError} from './generalError';

export class GeneraleErrorImpl implements GeneralError {
  public getGeneralError(message: string, title?: string) {
    Alert.alert(title ?? 'Error', message);
  }
}
