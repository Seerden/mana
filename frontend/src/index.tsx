require('file-loader?name=[name].[ext]!./index.html');

import App from 'components/App';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);