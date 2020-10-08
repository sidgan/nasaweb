import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import SwitchT from './Switch';

import './style.css';

class Guide extends Component {
    state = {}
    render() {
        console.log(this.props.status);
        return (
            <div>
                <Popup
                    open={this.props.status}
                    position="bottom left"
                    closeOnDocumentClick
                    onClose={this.props.togglePopup}
                    modal
                >
                    <div className="modal">
                    <p className="close" href="#" onClick={this.props.togglePopup}>
                        &times;
                    </p>
                    <div className="header"> CAMS Portal Instructions</div>
                    <div className="content">
                        <b>Explanation:</b> The celestial sphere shows stars in{' '}
                        <span style={{ color: 'black' }}>black</span> and meteors in
                        colors (showers:{' '}
                        <span style={{ color: 'red' }}>red = fast</span>,{' '}
                        <span style={{ color: 'blue' }}>blue = slow</span>) or white
                        (non-showers). Each dot is the direction from which a meteor
                        approached (called the "radiant"), displayed in sun-centered
                        ecliptic coordinates. Showers are assigned according to the CAMS
                        Shower Lookup Table (10 Mb) described in this publication. New
                        showers will show up as groupings of white dots.
                    </div>
                    <div className="content">
                        <b>Site usage:</b> Requires HTML5 compatable browser. Click the
                        text box under the{' '}
                        <span style={{ color: 'red' }}>red pointer</span>. From pop-up
                        calendar displayed, pick a past date to see available meteor
                        data from one of the meteor shower surveillance networks. Rotate
                        sphere with cursor. Hover over point to get the IAU stream
                        number. Click to bring up a new window to see that shower in
                        space.
                    </div>
                    <SwitchT />
                    </div>
                </Popup>
            </div>
        );
    }
}
 
export default Guide;
 