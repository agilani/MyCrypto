import React from 'react';

import translate from 'translations';
import { gasLimitValidator } from 'libs/validators';
import { Input } from 'components/ui';
import { InlineSpinner } from 'components/ui/InlineSpinner';
import { GasLimitFieldFactory } from './GasLimitFieldFactory';
import './GasLimitField.scss';

interface Props {
  customLabel?: string;
  disabled?: boolean;
  hideGasCalculationSpinner?: boolean;
}

export const GasLimitField: React.SFC<Props> = ({
  customLabel,
  disabled,
  hideGasCalculationSpinner
}) => (
  <GasLimitFieldFactory
    withProps={({ gasLimit: { raw }, onChange, readOnly, gasEstimationPending }) => (
      <div className="input-group-wrapper">
        <label className="input-group">
          <div className="input-group-header">
            {customLabel ? customLabel : translate('TRANS_GAS')}
            <div className="flex-spacer" />
            <InlineSpinner
              active={!hideGasCalculationSpinner && gasEstimationPending}
              text="Calculating"
            />
          </div>
          <Input
            className={gasLimitValidator(raw) ? 'is-valid' : 'is-invalid'}
            type="number"
            placeholder="21000"
            readOnly={!!readOnly}
            value={raw}
            onChange={onChange}
            disabled={disabled}
          />
        </label>
      </div>
    )}
  />
);
