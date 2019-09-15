// Import Modules
import React from 'react';
import ReactDOM from 'react-dom';

// Import Components
import App from './components/App/App';

// Import Styles
import './styles/index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
