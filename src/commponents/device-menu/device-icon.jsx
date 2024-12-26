import { useAppContext } from '@blockcode/core';

import deviceIcon from './icon-device.svg';
import deviceConnectedIcon from './icon-device-connected.svg';

export function DeviceIcon() {
  const { device } = useAppContext();
  return device.value ? <img src={deviceConnectedIcon} /> : <img src={deviceIcon} />;
}
