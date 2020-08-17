import React, { Component } from "react";
import * as d3 from 'd3';

import "./style.css";


class Globe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            rotation: 0
        }
    }

    render() {

        console.log(this.state.geoJson)
        let projection = d3.geoOrthographic()
            .fitSize([this.props.size, this.props.size], this.props.geoJson)
            .rotate([this.state.rotation])

        let geoGenerator = d3.geoPath()
            .projection(projection)

        let pathString = geoGenerator(this.props.geoJson)


        window.requestAnimationFrame(() => {
            this.setState({
                rotation: this.state.rotation + 0.7
            })
        })


        return (
            <svg width={this.props.size} height={this.props.size}>
                <path d={pathString} />
            </svg>
        )
    }
}
 
export default Globe;  