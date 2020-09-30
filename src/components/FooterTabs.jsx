import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './style.css';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     width: '100%',
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function FooterTabs() {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="footer">
      <Tabs value={value} onChange={handleChange} textColor="white" centered>
        <Tab label="All Video" {...a11yProps(0)} />
        <Tab label="Arizona" {...a11yProps(1)} />
        <Tab label="Arkansas" {...a11yProps(2)} />
        <Tab label="California" {...a11yProps(3)} />
        <Tab label="Florida" {...a11yProps(4)} />
        <Tab label="Maryland" {...a11yProps(5)} />
        <Tab label="GMN" {...a11yProps(6)} />
        <Tab label="Australia" {...a11yProps(7)} />
        <Tab label="BeNeLux" {...a11yProps(8)} />
        <Tab label="Brazil" {...a11yProps(9)} />
        <Tab label="Chile" {...a11yProps(10)} />
        <Tab label="Namibia" {...a11yProps(11)} />
        <Tab label="New Zeal." {...a11yProps(12)} />
        <Tab label="S. Africa" {...a11yProps(13)} />
        <Tab label="U.A.E" {...a11yProps(14)} />
      </Tabs>
    </div>
  );
}
