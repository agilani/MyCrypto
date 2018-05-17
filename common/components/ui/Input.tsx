import React, { HTMLProps } from 'react';

import './Input.scss';

interface OwnProps extends HTMLProps<HTMLInputElement> {
  showInvalidBeforeBlur?: boolean;
  setInnerRef?(ref: HTMLInputElement | null): void;
}

interface State {
  hasBlurred: boolean;
}

class Input extends React.Component<OwnProps, State> {
  public state: State = {
    hasBlurred: false
  };

  public render() {
    const { setInnerRef, showInvalidBeforeBlur, ...props } = this.props;

    return (
      <input
        {...props}
        ref={node => setInnerRef && setInnerRef(node)}
        onBlur={e => {
          this.setState({ hasBlurred: true });
          if (this.props && this.props.onBlur) {
            this.props.onBlur(e);
          }
        }}
        onWheel={this.props.type === 'number' ? this.preventNumberScroll : undefined}
        className={`input-group-input  ${this.props.className} ${
          showInvalidBeforeBlur || this.state.hasBlurred ? 'has-blurred' : ''
        } ${!!this.props.value && this.props.value.toString().length > 0 ? 'has-value' : ''}`}
      />
    );
  }

  // When number inputs are scrolled on while in focus, the number changes. So we blur
  // it if it's focused to prevent that behavior, without preventing the scroll.
  private preventNumberScroll(ev: React.WheelEvent<HTMLInputElement>) {
    if (document.activeElement === ev.currentTarget) {
      ev.currentTarget.blur();
    }
  }
}

export default Input;
