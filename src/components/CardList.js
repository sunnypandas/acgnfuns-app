import React from 'react';
import {
  Caption,
  GridRow,
  TouchableOpacity,
  ListView,
  View,
  Image,
  Card,
  ImageBackground,
} from '@shoutem/ui';

export default class CardList extends React.PureComponent {
  static props;
  constructor(props) {
    super(props);
    CardList.onPress = CardList.onPress.bind(this);
    this.onError = this.onError.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      imageLoading: true,
    };
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
  onError(error) {
    this._error = error;
    this.setState({ imageLoading: false });
  }
  renderRow(rowData, sectionId, index) {
    const cellViews = rowData.map((media, id) => {
      return (
        <TouchableOpacity
          key={id}
          styleName="flexible"
          onPress={() => CardList.onPress(media.category, media.url)}>
          <Card style={{ width: 'auto', alignItems: 'center', paddingTop: 5 }}>
            <ImageBackground
              source={require('../assets/images/error.jpg')}
              style={{ width: 90, height: 135, borderRadius: 5 }}>
              <Image
                source={{ uri: media.img }}
                style={{ width: 90, height: 135, borderRadius: 5 }}
                onError={this.onError}
              />
            </ImageBackground>
            <View styleName="content">
              <View styleName="horizontal h-center space-between">
                <Caption
                  styleName="collapsible"
                  numberOfLines={1}
                  style={{ width: '100%', textAlign: 'center' }}>
                  {media.name}
                </Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
    return <GridRow columns={3}>{cellViews}</GridRow>;
  }
  render() {
    const mediaList = this.props.mediaList;
    const groupedData = GridRow.groupByRows(mediaList, 3, () => {
      return 1;
    });
    return <ListView data={groupedData} renderRow={this.renderRow} />;
  }
}
