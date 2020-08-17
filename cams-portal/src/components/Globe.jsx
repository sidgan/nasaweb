import React, { Component } from "react";
import * as d3 from 'd3';

import "./style.css";


class Globe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    // componentWillMount() {
    //     this.setState({
    //       data: Data
    //     })
    //     console.log(Data)
    //   }

    render() {
        let projection = d3.geoOrthographic()
            .fitSize([this.props.size, this.props.size], this.props.geoJson)

        let geoGenerator = d3.geoPath()
            .projection(projection)

        let pathString = geoGenerator(this.props.geoJson)


        return (
            <svg width={this.props.size} height={this.props.size}>
                <path d={pathString} />
            </svg>
        )
    }
}
 
export default Globe;