import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: -10,
      top: -10,
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      background: "#ffffff",
      color: theme.palette.grey[500],
    },
    header: {
        padding: '1rem',
        fontSize: '20px',
        lineHeight: '26px',
    },
    subHeader: {
        padding: '1rem',
        fontSize: '12px',
        lineHeight: '14px',
        letterSpacing: '0.01em',
        textTransform: 'uppercase'
    }
});

const DataTooltip = withStyles(styles)((props) => {
    const [status, setStatus] = useState(true)

    const handleClose = () => {
        setStatus(false);
    };

    const { classes } = props;
    return (
        <React.Fragment>
            {status ?
                <div className="container data-tooltip">
                    <Grid container color="secondary" spacing={2}>
                        <Grid item xs={12}>
                            <div className="text-left">
                                <div className={classes.header}>
                                    <b>{props.meteor.name}</b>
                                </div>
                                <div className={classes.subHeader}>
                                    [{props.meteor.iau}]
                                </div>
                            </div>
                        </Grid>
                        <Grid container color="secondary" spacing={2}>
                        <Grid item xs={6}>
                            <div className="text-left">
                            </div>
                        </Grid>
                        </Grid>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                            
                    </Grid>
                </div>
            :
                null}
        </React.Fragment>
    )
});

export default React.memo(DataTooltip);