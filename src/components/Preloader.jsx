import React from 'react';
import { css } from '@emotion/core';
import MoonLoader from 'react-spinners/MoonLoader';

// Adding custom styles
const override = css`
  display: flex;
  margin: 35vh auto;
  z-index: 9999;
`;

class Preloader extends React.Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <div className="sweet-loading">
        <MoonLoader
          css={override}
          size={200}
          color={'rgba(255, 255, 255)'}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Preloader;
