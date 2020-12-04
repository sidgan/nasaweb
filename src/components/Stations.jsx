import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';


const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];



const Stations = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                style={{maxHeight: "40px", minHeight: "40px"}}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                variant="contained"
                color="secondary"
                onClick={handleClick}
                active
            >
                <Typography variant="h5" color="textSecondary">
                    All Locations <ArrowDropDownIcon size="large"/>
                </Typography>
            </Button>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                elevation={2}
                open={open}
                getContentAnchorEl={null}
                backgroundColor='rgba(71, 78, 116, 0.6)'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                {...props}
            >
                {options.map((option) => (
                <MenuItem key={option} color="primary" backgroundColor="rgba(71, 78, 116, 0.6)" selected={option === 'Pyxis'} onClick={handleClose}>
                    {option}
                </MenuItem>
                ))}
            </Menu>
        </div>
    );
}



export default Stations;