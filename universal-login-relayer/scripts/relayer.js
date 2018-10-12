import {providers} from 'ethers';
import Relayer from '../lib//relayer';

require('dotenv').config();

const config = require('../lib/config/relayer');
const provider = providers.getDefaultProvider('rinkeby');
const relayer = new Relayer(provider, config);
relayer.start();

