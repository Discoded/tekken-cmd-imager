import * as React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ToggleButton } from '@mui/material/';
import Link from "@mui/material/Link"

//import { Link } from 'react-router-dom';

import './HeaderComponent.css'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

export default function Header() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    };

    return(
        <div>
            <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} aria-label="basic tabs example">
                    <Tab label="Home" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="TEST" containerElement={<Link to="/settings"/>} />
                    <Tab label="TEST2" to='/settings' component={Link} />
                    
                </Tabs>
            <ToggleButton className="ThemeToggle" value="test" sx={{ alignSelf: 'flex-end'}}>
                    Dark
            </ToggleButton>
            
            </Box>
            
            <CustomTabPanel value={value} index={0}>
                Item One
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>

            
        </div>
    )
}