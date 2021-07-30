import axios from 'axios';
import * as lodash from 'lodash';
import Lottie from 'react-lottie';
import * as Router from '@freighter/router';

function externalRequire(module) {
	switch (module) {
		case 'window':
			return {};
		case 'lodash':
			return lodash;
		case 'react-router-dom':
			return Router;
		case 'react-lottie':
			return Lottie;
		case 'axios':
		case 'Axios':
			return axios;
		default:
			return null;
	}
}

export default externalRequire;
