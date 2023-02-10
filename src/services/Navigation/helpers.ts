// example of navigation function if needed

import {Navigation} from '../../services/Navigation/ReactNavigationNavigator';
import {Screens} from '../../services/Navigation/Screens';

const navigation = new Navigation();

export const navigateToCharScreen = (): void => {
  navigation.navigateTo(Screens.CharSlelectScreen);
};
