import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
  return class extends Component {
    state = {
      data: null,
      loading: true,
      error: false,
    };

    componentDidMount() {
      this.update();
    }

    update = async () => {
      try {
        this.setState({ loading: true, error: false });

        const data = await this.props.getData();
        this.setState({ data, loading: false });
      } catch (error) {
        this.setState({ loading: false, error: true });
      }
    };

    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <Spinner />;
      }

      if (error) {
        return <ErrorIndicator />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
