import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './PageComponents/App';
import reportWebVitals from './reportWebVitals';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './PageComponents/SearchPage';
import PriorityTasks from './PageComponents/PriorityTasks';
import {register} from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/Home"><PriorityTasks/></Route>
      <Route path="/Search"><SearchPage/></Route>
      <Route exact path="/Add"><App /></Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
register();
reportWebVitals();
