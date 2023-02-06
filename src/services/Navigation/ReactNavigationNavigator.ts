import {NavigationService} from './NavigationService';
import {Screens} from './Screens';
import React, {RefObject} from 'react';

export const navigationRef: RefObject<any> = React.createRef();
export class Navigation implements NavigationService {
  private navigationDispatcher?: RefObject<any> = navigationRef;

  navigateTo(screen: Screens) {
    this.navigationDispatcher?.current.navigate(screen);
  }

  goBack() {
    this.navigationDispatcher?.current.goBack();
  }
}
