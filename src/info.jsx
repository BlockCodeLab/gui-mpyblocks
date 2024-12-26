import { addLocalesMessages, Text } from '@blockcode/core';
import { version } from '../package.json';
import featureImage from './feature.png';

addLocalesMessages({
  en: {
    'mpyblocks.name': 'Electronic Blocks',
    'mpyblocks.description': 'Electronic world via building blocks.',
  },
  'zh-Hans': {
    'mpyblocks.name': '电子积木',
    'mpyblocks.description': '用积木搭建的奇妙电子世界。',
  },
  'zh-Hant': {
    'mpyblocks.name': '電子積木',
    'mpyblocks.description': '用積木搭建的奇妙電子世界。',
  },
});

export default {
  version,
  sortIndex: 2,
  image: featureImage,
  name: (
    <Text
      id="mpyblocks.name"
      defaultMessage="Electronic Blocks"
    />
  ),
  description: (
    <Text
      id="mpyblocks.description"
      defaultMessage="Electronic world via building blocks."
    />
  ),
  blocksRequired: true,
};
