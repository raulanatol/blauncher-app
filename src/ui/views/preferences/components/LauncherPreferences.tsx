import React, { FC, useState, useEffect } from 'react';
import { SerialDriver } from '../../../../driver/SerialDriver';

export const LauncherPreferences: FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const handleOnChange = ({ currentTarget }) => {
    setDisabled(!currentTarget.value);
  };

  useEffect(() => {
    SerialDriver.getPorts();
  } ,[]);

  return <div>
    <label htmlFor="serial">Serial:</label>
    <select id="serial" onChange={handleOnChange}>
      <option value="">---</option>
      <option value="123">123</option>
      <option value="456">456</option>
      <option value="789">789</option>
    </select>
    <button disabled={disabled}>Connect</button>
  </div>;
};
