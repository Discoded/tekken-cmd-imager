import { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';

// Custom Components
import Header from './components/header/HeaderComponent'
import HomePage from './components/home/HomeComponent';
import SettingsPage from './components/settings/SettingsComponent';
import Navigation from './components/navigation/NavigationComponent';
import Root from './components/root/RootComponent';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return <HomePage theTheme={darkTheme}/>;
}

export default App;