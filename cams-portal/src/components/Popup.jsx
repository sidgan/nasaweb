import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import './style.css';

class Popup extends Component {

    render() {
        console.log("Pop Out");
        return (
            <Container className="popup_container">
                <div className="popup">
                        <p>{this.props.text}</p>
                        <button onClick={this.props.closePopup}>
                            Close me
                        </button>
                </div>
            </Container>
        );
    }
}
 
export default Popup; 