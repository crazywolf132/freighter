import React from 'react';
import PropTypes from 'prop-types';
import {CoreProvider} from './context';
import Entry from './entry'

const AppEngine = (props) => {
	return <CoreProvider>
		<Entry {...props} />
	</CoreProvider>
}

export default AppEngine;