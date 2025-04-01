import { addLocalesMessages, Text } from '@blockcode/core';
import { version } from '../package.json';
import featureImage from './feature.png';

addLocalesMessages({
  en: {
    'mpyblocks.name': 'MicroPython Blocks',
    'mpyblocks.description': 'MicroPython programming via blocks.',
  },
  'zh-Hans': {
    'mpyblocks.name': 'MicroPython 积木',
    'mpyblocks.description': '通过积木搭建 MicroPython 程序。',
  },
  'zh-Hant': {
    'mpyblocks.name': 'MicroPython 積木',
    'mpyblocks.description': '通過積木構建 MicroPython 程序。',
  },
});

export default {
  version,
  hidden: true,
  sortIndex: 2,
  image: featureImage,
  name: (
    <Text
      id="mpyblocks.name"
      defaultMessage="MicroPython Blocks"
    />
  ),
  description: (
    <Text
      id="mpyblocks.description"
      defaultMessage="MicroPython programming via blocks."
    />
  ),
  blocksRequired: true,
};
