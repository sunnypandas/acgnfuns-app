import React from 'react';
import { connect } from 'dva-no-router';
import { View, Text, ScrollView, Divider } from '@shoutem/ui';
import HeaderBar from '../components/HeaderBar';
import MainCarousel from '../components/MainCarousel';
import { mediaListTransTo } from '../utils/utils';
import CardList from '../components/CardList';

@connect(({ acgn }) => ({
  acgn,
}))
export default class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      carouselList: [],
      indexAnimationBangumiList: [],
      indexComicMangaList: [],
      indexGameGeimuList: [],
      indexNovelNoberuList: [],
    };
  }
  static navigationOptions = ({ navigation }) => {
    return { header: <HeaderBar title={'首页'} navigation={navigation} /> };
  };
  componentWillMount() {
    const { setParams } = this.props.navigation;
    setParams({ navigation: this.props.navigation });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'acgn/carouselListFetch',
      payload: {},
    }).then(() => {
      const { acgn } = this.props;
      this.setState({ carouselList: acgn.carouselList });
    });
    dispatch({
      type: 'acgn/indexAnimationBangumiListFetch',
      payload: {
        page: 0,
        size: 12,
        type: '动画',
      },
    }).then(() => {
      const { acgn } = this.props;
      this.setState({
        indexAnimationBangumiList: mediaListTransTo(acgn.indexAnimationBangumiList),
      });
    });
    dispatch({
      type: 'acgn/indexComicMangaListFetch',
      payload: {
        page: 0,
        size: 12,
        type: '漫画',
      },
    }).then(() => {
      const { acgn } = this.props;
      this.setState({ indexComicMangaList: mediaListTransTo(acgn.indexComicMangaList) });
    });
    dispatch({
      type: 'acgn/indexGameGeimuListFetch',
      payload: {
        page: 0,
        size: 12,
        type: '游戏',
      },
    }).then(() => {
      const { acgn } = this.props;
      this.setState({ indexGameGeimuList: mediaListTransTo(acgn.indexGameGeimuList) });
    });
    dispatch({
      type: 'acgn/indexNovelNoberuListFetch',
      payload: {
        page: 0,
        size: 12,
        type: '轻小说',
      },
    }).then(() => {
      const { acgn } = this.props;
      this.setState({ indexNovelNoberuList: mediaListTransTo(acgn.indexNovelNoberuList) });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <View style={{ marginBottom: 5, padding: 10 }}>
            <Text style={{ padding: 5, fontSize: 12, fontWeight: 'bold', color: 'gray' }}>
              热门推荐
            </Text>
            <MainCarousel data={this.state.carouselList} />
          </View>
          <Divider styleName="line" />
          <View style={{ marginBottom: 5, padding: 10 }}>
            <Text style={{ padding: 5, fontSize: 12, fontWeight: 'bold', color: 'gray' }}>
              动画推荐
            </Text>
            <CardList
              mediaList={this.state.indexAnimationBangumiList}
              navigation={this.props.navigation}
            />
          </View>
          <Divider styleName="line" />
          <View style={{ marginBottom: 5, padding: 10 }}>
            <Text style={{ padding: 5, fontSize: 12, fontWeight: 'bold', color: 'gray' }}>
              漫画推荐
            </Text>
            <CardList
              mediaList={this.state.indexComicMangaList}
              navigation={this.props.navigation}
            />
          </View>
          <Divider styleName="line" />
          <View style={{ marginBottom: 5, padding: 10 }}>
            <Text style={{ padding: 5, fontSize: 12, fontWeight: 'bold', color: 'gray' }}>
              游戏推荐
            </Text>
            <CardList
              mediaList={this.state.indexGameGeimuList}
              navigation={this.props.navigation}
            />
          </View>
          <Divider styleName="line" />
          <View style={{ marginBottom: 5, padding: 10 }}>
            <Text style={{ padding: 5, fontSize: 12, fontWeight: 'bold', color: 'gray' }}>
              轻小说推荐
            </Text>
            <CardList
              mediaList={this.state.indexNovelNoberuList}
              navigation={this.props.navigation}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
