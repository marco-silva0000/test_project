import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import People from './People';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [selected, setSelected] = useState(0)
  const apps = [
  {
    name: 'Home',
    link: '/',
    exact: true,
  },
  {
    name: 'People',
    link: '/people',
    exact: false,
  },
  ]
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            {apps.map((obj, index) => 
              <Link to={obj.link}>
              <Button key={obj.name} onClick={() => setSelected(index)} variant={index === selected ? "contained" : "text"} >
              {obj.name}
            </Button>
          </Link>
            )}
          </Toolbar>

        </AppBar>
        <Route exact path="/" component={Home} />
        <Route exact path="/people" component={People} />
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
