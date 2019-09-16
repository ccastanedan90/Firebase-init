// Import Modules
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'

// Import Components
import App from './components/App/App';

// Import Styles
import './styles/index.css';

// Import Utils
import { firebaseConfig } from './firebase'
import * as serviceWorker from './serviceWorker';

firebase.initializeApp(firebaseConfig)
serviceWorker.unregister();

ReactDOM.render(<App />, document.getElementById('root'));

