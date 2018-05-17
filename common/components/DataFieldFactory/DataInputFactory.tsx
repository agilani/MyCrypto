import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppState } from 'redux/reducers';
import { getData, getDataExists } from 'redux/transaction/selectors';
import { CallBackProps } from 'components/DataFieldFactory';
import { Query } from 'components/renderCbs';

interface OwnProps {
  withProps(props: CallBackProps): React.ReactElement<any> | null;
  onChange(ev: React.FormEvent<HTMLInputElement>): void;
}
interface StateProps {
  data: AppState['transaction']['fields']['data'];
  dataExists: boolean;
}

type Props = OwnProps & StateProps;

class DataInputClass extends Component<Props> {
  public render() {
    const { data, onChange, dataExists } = this.props;
    return (
      <Query
        params={['readOnly']}
        withQuery={({ readOnly }) =>
          this.props.withProps({ data, onChange, readOnly: !!readOnly, dataExists })
        }
      />
    );
  }
}

export const DataInput = connect((state: AppState) => ({
  data: getData(state),
  dataExists: getDataExists(state)
}))(DataInputClass);
