import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';

class GroupedButton extends Component {
    state = {  }
    render() { 
        return (
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonGroup size="large" style={{maxHeight: "40px", minHeight: "40px"}}>
                        <Button variant="contained" color="primary" disabled>
                            <Typography variant="body2" color="textPrimary">Sphere</Typography>
                        </Button>

                        <Button variant="contained" color="secondary">
                            <Typography variant="body2" color="textSecondary">Table</Typography>
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item>
                    <Button style={{maxHeight: "40px", maxWidth: "40px", minHeight: "40px", minWidth: "40px"}} variant="contained" color="secondary">
                        ?
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
 
export default GroupedButton;