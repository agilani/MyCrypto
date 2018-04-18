import { Query } from 'components/renderCbs';
import { setCurrentTo, TSetCurrentTo } from 'actions/transaction';
import { AddressInputFactory } from './AddressInputFactory';
import AddressFieldDropdown from './AddressFieldDropdown';
import React from 'react';
import { connect } from 'react-redux';
import { ICurrentTo } from 'selectors/transaction';
import './AddressFieldFactory.scss';

interface DispatchProps {
  setCurrentTo: TSetCurrentTo;
}

interface OwnProps {
  to: string | null;
  isSelfAddress?: boolean;
  withProps(props: CallbackProps): React.ReactElement<any> | null;
}

export interface CallbackProps {
  isValid: boolean;
  readOnly: boolean;
  currentTo: ICurrentTo;
  onChange(ev: React.FormEvent<HTMLInputElement>): void;
}

type Props = DispatchProps & OwnProps;

class AddressFieldFactoryClass extends React.Component<Props> {
  public componentDidMount() {
    // this 'to' parameter can be either token or actual field related
    const { to } = this.props;
    if (to) {
      this.props.setCurrentTo(to);
    }
  }

  public render() {
    return (
      <div className="AddressField">
        <AddressInputFactory
          isSelfAddress={this.props.isSelfAddress}
          onChange={this.setAddress}
          onKeyDown={e => alert(e.keyCode)}
          withProps={this.props.withProps}
        />
        <AddressFieldDropdown onSelect={this.setAddress} />
      </div>
    );
  }

  private setAddress = (ev: React.FormEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;
    this.props.setCurrentTo(value);
  };
}

const AddressFieldFactory = connect(null, { setCurrentTo })(AddressFieldFactoryClass);

interface DefaultAddressFieldProps {
  isSelfAddress?: boolean;
  withProps(props: CallbackProps): React.ReactElement<any> | null;
}

const DefaultAddressField: React.SFC<DefaultAddressFieldProps> = ({ isSelfAddress, withProps }) => (
  <Query
    params={['to']}
    withQuery={({ to }) => (
      <AddressFieldFactory to={to} isSelfAddress={isSelfAddress} withProps={withProps} />
    )}
  />
);

export { DefaultAddressField as AddressFieldFactory };
