import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
// React-Redux components
import store from './redux/store/index'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
