import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'dva-no-router';
import { Icon } from 'expo';
import { mediaListTransTo } from '../utils/utils';

@connect(({ acgn }) => ({
  acgn,
}))
export default class SearchList extends React.PureComponent {
  constructor(props) {
    super(props);
    SearchList.onPress = SearchList.onPress.bind(this);
    this.state = {
      mediaList: [],
      loading: false,
      page: 0,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page } = this.state;
    this.getData(page);
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 0,
        refreshing: true,
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  getData() {
    this.setState({ loading: true });
    let method = 'mediaSearchListFetch';
    let response = 'mediaSearchList';
    const { dispatch } = this.props;
    dispatch({
      type: 'acgn/' + method,
      payload: {
        name: this.props.keyword,
      },
    })
      .then(() => {
        const { acgn } = this.props;
        this.setState({
          mediaList: mediaListTransTo(acgn[response]),
          error: 'error' || null,
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }
  static onPress(type, url) {
    let router = '';
    if (type === '动画') {
      router = 'AnimationBangumi';
    } else if (type === '漫画') {
      router = 'ComicManga';
    } else if (type === '游戏') {
      router = 'GameGeimu';
    } else if (type === '轻小说') {
      router = 'NovelNoberu';
    }
    this.props.navigation.navigate(router, {
      url,
    });
  }
  render() {
    return (
      <FlatList
        data={this.state.mediaList}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={item.category}
            leftAvatar={{
              source: { uri: item.img },
              title: item.name,
            }}
            rightIcon={<Icon.Feather name="arrow-up-right" size={24} color="gray" />}
            containerStyle={{ borderBottomWidth: 0 }}
            onPress={() => SearchList.onPress(item.category, item.url)}
          />
        )}
        keyExtractor={(item, index) => 'list-item-' + index}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
      />
    );
  }
}
