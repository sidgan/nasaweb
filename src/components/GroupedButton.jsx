import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Helper from './Helper';


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'rgba(71, 78, 116, 0.6)',
      color: "primary",
      maxWidth: 448,
      maxHeight: 480,
      marginBlock: '5px',
      border: '2px solid #474E74',
    },
}))(Tooltip);


class GroupedButton extends Component {

    render() { 
        return (
            <Grid container spacing={2}>
                <Grid item>
                    {
                    this.props.showGlobe ?

                    <ButtonGroup size="large" style={{maxHeight: "40px", minHeight: "40px"}}>
                        <Button variant="contained" color="primary" active>
                            <Typography variant="h5" color="textSecondary">Sphere</Typography>
                        </Button>

                        <Button variant="contained" color="secondary" onClick={this.props.toggleDisplay}>
                            <Typography variant="h5" color="textSecondary">Table</Typography>
                        </Button>
                    </ButtonGroup>

                    :


                    <ButtonGroup size="large" style={{maxHeight: "40px", minHeight: "40px"}}>
                        <Button variant="contained" color="secondary" onClick={this.props.toggleDisplay}>
                            <Typography variant="h5" color="textSecondary">Sphere</Typography>
                        </Button>

                        <Button variant="contained" color="primary" active>
                            <Typography variant="h5" color="textPrimary">Table</Typography>
                        </Button>
                    </ButtonGroup> 
                    
                    }
                </Grid>
                <Grid item>
                    <HtmlTooltip
                        title={<Helper />}
                    >
                        <Button style={{maxHeight: "40px", maxWidth: "40px", minHeight: "40px", minWidth: "40px", fontSize: "20px"}} variant="contained" color="secondary" active>
                            <b>?</b>
                        </Button>
                    </HtmlTooltip>
                </Grid>
            </Grid>
        );
    }
}
 
export default GroupedButton;