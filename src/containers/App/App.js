import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

// import jquery from '../../../static/scripts/jquery.min.js'
// import jsext from '../../../static/scripts/js.ext.js'
// import jsextdom from '../../../static/scripts/js.ext.dom.js'
// import Module from '../../../static/engine/Module.js'

// import injectTapEventPlugin from 'react-tap-event-plugin';
//
// // Needed for onTouchTap
// // http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  componentWillMount() {
    const script = document.createElement("script");

    script.src = "/scripts/jquery.min.js";
    document.body.appendChild(script);

    script.src = "/scripts/js.ext.js";
    document.body.appendChild(script);

    script.src = "/scripts/js.ext.dom.js";
    document.body.appendChild(script);

    script.src = "/engine/Module.js";
    document.body.appendChild(script);

    script.src = "/engine/WacomInkEngine.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    const styles = require('./App.scss');

    return (
      <MuiThemeProvider>

        <div>
          <AppBar title="ASTEP" />

          <div className={styles.appContent}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
