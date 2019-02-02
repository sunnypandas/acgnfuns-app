import React from 'react';
import { Linking } from 'react-native';
import { View, Text, ScrollView, Divider, Row, Image, Subtitle, Caption, Html } from '@shoutem/ui';
import { connect } from 'dva-no-router';
import striptags from 'striptags';
import HeaderBar from '../components/HeaderBar';
import { getImageUrl, htmlClear } from '../utils/utils';

@connect(({ acgn }) => ({
  acgn,
}))
export default class AnimationBangumiScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onError = this.onError.bind(this);
    this.state = {
      media: {},
      imageLoading: true,
    };
  }
  static navigationOptions = {
    header: <HeaderBar title={'动画详情'} />,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'acgn/animationBangumiByUrlFetch',
      payload: {
        url: this.props.navigation.getParam('url', ''),
      },
    }).then(() => {
      const { acgn } = this.props;
      const tempMedia = acgn.animationBangumi;
      const mediaObj = {
        url: tempMedia.url,
        img: getImageUrl(tempMedia.images),
        name: tempMedia.name,
        authorNames: tempMedia.authorNames,
        actorNames: striptags(tempMedia.actorNames),
        directorNames: tempMedia.directorNames,
        showDate: tempMedia.showDate,
        areaNames: tempMedia.areaNames,
        language: tempMedia.language,
        status: tempMedia.status,
        type: tempMedia.type,
        introduction: htmlClear(tempMedia.introduction),
        updateTime: tempMedia.updateTime,
        category: tempMedia.category,
      };
      this.setState({ media: mediaObj });
    });
  }
  onError(error) {
    this._error = error;
    this.setState({ imageLoading: false });
  }
  render() {
    const { media } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <View style={{ marginBottom: 5, padding: 10 }}>
            <Text style={{ padding: 5, fontSize: 12, fontWeight: 'bold', color: 'gray' }}>
              基本信息
            </Text>
            <Row>
              <Image
                styleName="medium rounded-corners"
                source={
                  this.state.imageLoading
                    ? { uri: media.img }
                    : require('../assets/images/error.jpg')
                }
                style={{ width: 90, height: 135, borderRadius: 5 }}
                onError={this.onError}
              />
              <View styleName="vertical stretch space-between">
                <Subtitle
                  numberOfLines={1}
                  onPress={() => {
                    Linking.openURL(media.url);
                  }}>
                  {media.name}
                </Subtitle>
                <Row>
                  <View styleName="vertical space-between">
                    <Caption numberOfLines={1}>
                      <Caption style={{ fontWeight: 'bold' }}>语言：</Caption>
                      {media.language}
                    </Caption>
                    <Caption numberOfLines={1}>
                      <Caption style={{ fontWeight: 'bold' }}>地区：</Caption>
                      {media.areaNames}
                    </Caption>
                    <Caption numberOfLines={1}>
                      <Caption style={{ fontWeight: 'bold' }}>演员：</Caption>
                      {media.actorNames}
                    </Caption>
                  </View>
                  <View styleName="vertical space-between">
                    <Caption numberOfLines={1}>
                      <Caption style={{ fontWeight: 'bold' }}>状态：</Caption>
                      {media.status}
                    </Caption>
                    <Caption numberOfLines={1}>
                      <Caption style={{ fontWeight: 'bold' }}>更新：</Caption>
                      {media.updateTime}
                    </Caption>
                    <Caption numberOfLines={1}>
                      <Caption style={{ fontWeight: 'bold' }}>时间：</Caption>
                      {media.showDate}
                    </Caption>
                  </View>
                </Row>
              </View>
            </Row>
          </View>
          <Divider styleName="line" />
          <View style={{ marginBottom: 5, padding: 10 }}>
            <Text style={{ padding: 5, fontSize: 12, fontWeight: 'bold', color: 'gray' }}>
              简介
            </Text>
            <Html body={media.introduction + ''} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
