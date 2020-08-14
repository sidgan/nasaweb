import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import logo from '../images/NASA_logo.jpg';

import './Navigation.css';
import "react-datepicker/dist/react-datepicker.css";

class NavigationBar extends Component {

    state = {
        date: "Pick A Date To See Meteors"
    }

    handleDateSelect = date => {
        console.log("Handle Works");
        let newDate = date.toDateString();
        this.setState({
            date: newDate
        })
    }
    
    render() {

        return (
           <div className='flexbox_container'>
                <a className='logo_item col-lg-2' href="http://cams.seti.org">
                    <img src={logo} alt="NASA" width="80"/>
                </a>

                <p className="title_item col-lg-7">
                    NASA (CAMS) Meteor Shower Portal
                </p>

                
                <div className="search_box col-lg-3">
                    <br/>
            
                    <DatePicker
                        className="datepicker"
                        value={this.state.date}
                        onSelect={this.handleDateSelect}
                        onChange={this.handleDateChange}
                    />
                </div>
           </div>
        );
    }
}


export default NavigationBar;   