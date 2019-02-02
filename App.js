import React from 'react';
import dva, { connect } from 'dva-no-router';
import Starter from './src/components/Starter';
import acgn from './src/models/acgn';

const app = dva({
  onError: (err, dispatch) => {
    err.preventDefault();
    if (err.response) {
    }
  },
});
app.model(acgn);
@connect(({ acgn }) => ({
  acgn,
}))
class App extends React.PureComponent {
  render() {
    return <Starter />;
  }
}

app.router(() => <App />);
const DvaApp = app.start();
export default () => <DvaApp />;
