import React, { Component } from 'react';
import Responsive from 'react-responsive-decorator';
import './style.css';

class Footer extends Component {
    state = {}

    render() {
        return (
            <section>
                <div className="footer">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-9 text-left">
                                <p>Hosted by: <a href="https://www.seti.org">The SETI Institute</a></p>
                                <p>Curator: <a href="mailto:petrus.m.jenniskens@nasa.gov">Peter Jenniskens  </a></p>
                                <p>Responsible NASA Official: <a href="https://cams.seti.org">Lindley Johnson</a></p>
                            </div>

                            <div className="col-md-3 footer_nav text-right">
                                <h5>About</h5>
                                <h5>Start A Network</h5>
                                <h5>CAMS</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
 
export default Responsive(Footer);