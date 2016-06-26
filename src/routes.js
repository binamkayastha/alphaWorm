import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    About,
    NotFound,
    Alphabet,
    AlphabetA
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="about" component={About}/>

      <Route path="alphabet" component={Alphabet}/>
      <Route path="alphabet/a" component={AlphabetA}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
