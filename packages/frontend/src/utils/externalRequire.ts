import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as lodash from 'lodash';

import * as Router from '@freighter/router';

function externalRequire(module) {
	switch (module) {
		case 'window':
			return {};
		case 'react':
			return React;
		case 'react-dom':
			return ReactDOM;
		case 'lodash':
			return lodash;
		case 'react-router-dom':
			return Router;
		case 'axios':
		case 'Axios':
			return axios;
		default:
			return null;
	}
}

export default externalRequire;
