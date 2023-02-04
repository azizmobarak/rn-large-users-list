import {NavigationProp} from '@react-navigation/native';
import {NavigationService} from './NavigationService';
import {Screens} from './Screens';

export class Navigation implements NavigationService {
  private navigationDispatcher?: NavigationProp<any>;

  navigateTo(screen: Screens) {
    this.navigationDispatcher?.navigate(screen);
  }

  goBack() {
    this.navigationDispatcher?.goBack();
  }
}
