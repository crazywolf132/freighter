import React from 'react';
import { CoreProvider } from './context';
import Entry from './entry'

const AppEngine = (props) => {
	return <CoreProvider>
		<Entry {...props} />
	</CoreProvider>
}

export default AppEngine;