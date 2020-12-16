import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';

import { SourceContext } from './Globe';

const options = [
    'ALL',
    'ARCHIVE',
    'AR',
    'AUS',
    'CAMS',
    'EXOSS',
    'GMN',
    'MA',
    'NCA',
    'TEXAS',
    'UAE',
    'BENELUX',
    'CHILE',
    'EDMOND',
    'FL',
    'LOCAMS',
    'NAMIBIA',
    'NZ',
    'SA',
    'SONOTACO',
    'TK',
];

const Stations = (props) => {
    const source = useContext(SourceContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (d) => {
        console.log(d);
        props.onChange(d);

        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                style={{ maxHeight: '50px', minHeight: '50px' }}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                variant="contained"
                color="secondary"
                onClick={handleClick}
                active
            >
                <Typography variant="h4" color="textSecondary">
                    All Locations <ArrowDropDownIcon size="large" />
                </Typography>
            </Button>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                elevation={2}
                open={open}
                getContentAnchorEl={null}
                backgroundcolor="rgba(71, 78, 116, 0.6)"
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
                    <MenuItem
                        key={option}
                        color="primary"
                        backgroundcolor="rgba(71, 78, 116, 0.6)"
                        selected={option === source}
                        onClick={handleClose}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Stations;
