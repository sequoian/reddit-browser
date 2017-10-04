import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './css/reset.css';
import 'react-datepicker/dist/react-datepicker.css';
import './css/index.css';
import './css/App.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
