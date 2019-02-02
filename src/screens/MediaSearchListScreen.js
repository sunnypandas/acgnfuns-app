import React from 'react';
import { View } from '@shoutem/ui';
import { connect } from 'dva-no-router';
import HeaderBar from '../components/HeaderBar';
import SearchList from '../components/SearchList';

@connect(({ acgn }) => ({
  acgn,
}))
export default class MediaSearchListScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    header: <HeaderBar title={'搜索列表'} />,
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ marginBottom: 5, padding: 10 }}>
          <SearchList
            keyword={this.props.navigation.getParam('keyword', '')}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}
