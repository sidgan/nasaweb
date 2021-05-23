import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

class Preloader extends React.Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <div className="pre-loader">
        <MoonLoader
          size={this.props.size}
          color={'rgba(255, 255, 255)'}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Preloader;
