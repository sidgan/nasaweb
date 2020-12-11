import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


class ZoomButton extends Component {
    state = {  }
    render() { 
        return (
            <Grid container>
                <Grid item>
                    <ButtonGroup
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical contained primary button group"
                        variant="contained"
                    >
                        <Button variant="contained" color="secondary" style={{minWidth: "50px", minHeight: "50px", fontSize: "20px"}} active>
                            +
                        </Button>

                        <Button variant="contained" color="secondary" style={{minWidth: "50px", minHeight: "50px", fontSize: "20px"}} active>
                            -
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }
}
 
export default ZoomButton;