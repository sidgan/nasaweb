import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const DataTooltip = (props) => {
    return (
        <React.Fragment>
            <Grid container color="secondary" spacing={2}>
                <Grid item xs={12} spacing={1}>
                    <Typography variant="h6" color="textPrimary">
                        {props.children}
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default DataTooltip;