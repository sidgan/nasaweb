import React, { Component } from 'react';
import { DatePicker } from 'react-rainbow-components';
import Responsive from 'react-responsive-decorator';
import logo from '../images/icon.png';

import './style.css';

class Header extends Component {
  state = {
    date: this.props.selectedDate,
  };

  componentDidUpdate() {
    console.log(`Here we are! ${this.state.date}`);
    this.props.onDateChange(this.state.date);
  }

  render() {
    return (
      <div className="flexbox_container p-3">
        {/* <a className="logo_item col-lg-4" href="http://cams.seti.org">
          <img src={logo} alt="NASA" width="80" height="70" />
        </a> */}

        <p className="title_item col-lg-10"> 
          <a className="logo_item" href="http://cams.seti.org">
            <img src={logo} alt="NASA" width="60" height="40" />
          </a>
           Meteor Shower Portal
        </p>
        <div className="search_box col-lg-2">
          {/* <img
            src="https://img.icons8.com/ios-filled/50/e74c3c/down2.png"
            alt=""
          />
          <br /> */}

          <div
            className="rainbow-align-content_right rainbow-m-vertical_large"
            style={{ maxWidth: 350 }}
          >
            <DatePicker
              minDate={new Date(2018, 10, 1)}
              maxDate={new Date(2020, 10, 8)}
              value={this.state.date}
              onChange={(value) =>
                this.setState({ date: value.toDateString() })
              }
              placeholder="Pick A Date To See Meteors"
              formatStyle="large"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Responsive(Header);

// const Header = props => {

//   const { onDateChange } = props;
//   const [ date, setDate ] = useState(props.selectedDate);
//   useEffect(() => {
//     onDateChange(date)
//   }, [date])

//   console.log(`Selected date - ${date}`);

//   return (
//     <div className="flexbox_container p-3">
//       <a className="logo_item col-lg-2" href="http://cams.seti.org">
//         <img src={logo} alt="NASA" width="100" />
//       </a>

//       <p className="title_item col-lg-7">NASA Meteor Shower Portal</p>
//       <div className="search_box col-lg-3">
//         <img src="https://img.icons8.com/ios-filled/50/e74c3c/down2.png" alt=""/>
//         <br />
//           <DatePicker
//             value={date}
//             onChange={value => setDate(value)}
//             placeholder="Pick A Date To See Meteors"
//           />
//         {/* <DatePicker dateFormat="m/d/Y" datePickerType="simple">
//           <DatePickerInput
//             id="date-picker-default-id"
//             placeholder="mm/dd/yyyy"
//             labelText="Date picker label"
//             type="text"
//           />
//         </DatePicker> */}
//       </div>
//     </div>
//   );

// }

// export default Header;
