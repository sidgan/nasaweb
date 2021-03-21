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
          size={200}
          color={'rgba(255, 255, 255)'}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Preloader;
