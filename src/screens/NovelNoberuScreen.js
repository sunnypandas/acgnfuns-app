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
export default class NovelNoberuScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onError = this.onError.bind(this);
    this.state = {
      media: {},
      imageLoading: true,
    };
  }
  static navigationOptions = {
    header: <HeaderBar title={'轻小说详情'} />,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'acgn/novelNoberuByUrlFetch',
      payload: {
        url: this.props.navigation.getParam('url', ''),
      },
    }).then(() => {
      const { acgn } = this.props;
      const tempMedia = acgn.novelNoberu;
      const mediaObj = {
        url: tempMedia.url,
        img: getImageUrl(tempMedia.images),
        name: tempMedia.name,
        authorNames: striptags(tempMedia.authorNames),
        areaNames: tempMedia.areaNames,
        language: tempMedia.language,
        status: tempMedia.status,
        type: tempMedia.type,
        size: tempMedia.size,
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
                      <Caption style={{ fontWeight: 'bold' }}>作者：</Caption>
                      {media.authorNames}
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
                      <Caption style={{ fontWeight: 'bold' }}>大小：</Caption>
                      {media.size}
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
