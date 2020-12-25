import React from 'react';
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";

// Adding custom styles
const override = css`
    display: flex;
    margin: 15vh 30vw;
    border-color: red;
    z-index: 9999;
`;


class Preloader extends React.Component {
    state = {
        loading: true
    };

    render() {
        return (
            <div className="sweet-loading">
                <MoonLoader
                    css={override}
                    size={500}
                    color={"rgba(0, 66, 128)"}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default Preloader;