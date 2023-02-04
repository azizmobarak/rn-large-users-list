import {Navigation} from '../../services/Navigation/ReactNavigationNavigator';
import {Screens} from '../../services/Navigation/Screens';

const navigation = new Navigation();

export const navigateToPaginationUserMiddlware = (): void => {
  navigation.navigateTo(Screens.UsersPaginationScreen);
};
