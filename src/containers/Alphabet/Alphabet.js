import React, { Component } from 'react';
import { Paper, List, ListItem, Divider } from 'material-ui';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import {Link} from 'react-router'

export default class Alphabet extends Component {
  render() {
    return (
      <Paper>
        <List>
          <ListItem primaryText="A" linkButton containerElement={<Link to="/alphabet/a" />} leftIcon={<ContentInbox />} />
          <ListItem primaryText="B" linkButton containerElement={<Link to="/alphabet/b" />} leftIcon={<ContentInbox />} />
          <ListItem primaryText="C" linkButton containerElement={<Link to="/alphabet/c" />} leftIcon={<ContentInbox />} />
        </List>
      </Paper>
    );
  }
}
