import {Screens} from './Screens';

export interface NavigationService {
  goBack: () => void;
  navigateTo: (screen: Screens) => void;
}
