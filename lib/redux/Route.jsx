import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resolve } from 'react-resolver';

class Route extends Component {
  componentDidMount() {
    if (this.props.hooks && this.props.hooks.onEnter) {
      this.props.hooks.onEnter();
    }
  }

  componentWillUnmount() {
    if (this.props.hooks && this.props.hooks.beforeExit) {
      this.props.hooks.beforeExit();
    }
  }

  render() {
    if (this.props.hooks && this.props.hooks.asyncBeforeEnter) {
      const resolver = (props) => (
        React.cloneElement(props.component, {
          data: props.data,
          children: props.children
        })
      );

      const ResolvedComponent = resolve('data', this.props.hooks.asyncBeforeEnter)(resolver);

      return (
        <ResolvedComponent
          component={<this.props.component />}
          children={this.props.children}
        />
      );
    }

    return (
      <this.props.component
        params={this.props.params}
        queries={this.props.queries}
        children={this.props.children}
      />
    );
  }
}

Route.propTypes = {
  children: React.PropTypes.any,
  store: React.PropTypes.object,
  hooks: React.PropTypes.any
};

const mapStateToProps = (state, ownProps) => ({
  ...state,
  ...ownProps
});

export default connect(mapStateToProps)(Route);
