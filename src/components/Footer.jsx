import React, { Component } from 'react';
import Responsive from 'react-responsive-decorator';
import './style.css';

class Footer extends Component {
    state = {}

    render() { 
        return (
            <section>
                <div className="footer">
                    <div className="">
                        <div className="row p-0">
                            <div className="col-md-9 text-left p-1">
                                <p>Hosted by: <a href="http://www.seti.org">The SETI Institute  </a> Curator: <a href="mailto:petrus.m.jenniskens@nasa.gov">Peter Jenniskens  </a> Responsible NASA Official: <a href="http://cams.seti.org">Lindley Johnson</a></p>
                            </div>

                            <div className="col-md-3 footer_nav text-right">
                                <h5>Globe Legend</h5>
                                <h5>About</h5>
                                <h5>Contributors</h5>
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