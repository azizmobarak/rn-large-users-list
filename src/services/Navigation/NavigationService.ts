import {Screens} from './Screens';
// import React from 'react';

export interface NavigationService {
  goBack: () => void;
  navigateTo: (screen: Screens) => void;
}

// export const navigationRef = React.createRef();
