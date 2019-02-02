import React from 'react';
import { View } from '@shoutem/ui';
import { connect } from 'dva-no-router';
import HeaderBar from '../components/HeaderBar';
import RowList from '../components/RowList';

@connect(({ acgn }) => ({
  acgn,
}))
export default class ComicMangaListScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    header: <HeaderBar title={'漫画列表'} />,
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ marginBottom: 5, padding: 10 }}>
          <RowList type={'漫画'} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
