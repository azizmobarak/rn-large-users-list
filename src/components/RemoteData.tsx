import React from 'react';
import {RemoteData} from '../utils/typing';

type Props = {
  renderView: () => React.ReactElement;
  renderError: () => React.ReactElement;
  renderLoading: () => React.ReactElement;
  state: RemoteData;
};

export default function RemoteDataComponent(props: Props) {
  switch (props.state) {
    case RemoteData.Error:
      return props.renderError();
    case RemoteData.Loading:
      return props.renderLoading();
    default:
      return props.renderView();
  }
}
