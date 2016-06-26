import React, { Component } from 'react';
import { Paper, List, ListItem, Divider, Subheader } from 'material-ui';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import {Link} from 'react-router'

export default class Home extends Component {
  render() {
    return (
      <Paper>
        <Subheader>Getting Started</Subheader>
        <List>
          <ListItem primaryText="Alphabet" linkButton containerElement={<Link to="/alphabet" />} leftIcon={<ContentInbox />} />
          <ListItem primaryText="Shapes" linkButton containerElement={<Link to="/shapes" />} leftIcon={<ContentInbox />} />
          <ListItem primaryText="Numbers" linkButton containerElement={<Link to="/numbers" />} leftIcon={<ContentInbox />} />
        </List>
        <Divider />
        <Subheader>Learning Words</Subheader>
        <List>
          <ListItem primaryText="Transportation" linkButton containerElement={<Link to="/transportation" />} leftIcon={<ContentInbox />} />
          <ListItem primaryText="Places" linkButton containerElement={<Link to="/places" />} leftIcon={<ContentInbox />} />
          <ListItem primaryText="Fruits" linkButton containerElement={<Link to="/fruits" />} leftIcon={<ContentInbox />} />
          <ListItem primaryText="Veggies" linkButton containerElement={<Link to="/veggies" />} leftIcon={<ContentInbox />} />
        </List>
      </Paper>
    );
  }
}
