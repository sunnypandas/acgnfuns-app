import React from 'react';

import styled from 'styled-components/native'; // 3.1.6
import Carousel from 'react-native-snap-carousel'; // 3.6.0
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import styles, { colors } from '../styles/index.style';

export default class MainCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
    this.props = props;
    this._carousel = {};
  }

  static handleSnapToItem(index) {}

  _renderItem = ({ item, index }) => {
    return (
      <ThumbnailBackgroundView>
        <CurrentVideoTO
          onPress={() => {
            this._carousel.snapToItem(index);
          }}>
          <CurrentVideoImage source={{ uri: item.img }} />
        </CurrentVideoTO>
        {/*<NextVideoImage source={{ uri: this.state.currentVideo.nextVideoId }}/>*/}
        <VideoTitleText>{item.name}</VideoTitleText>
      </ThumbnailBackgroundView>
    );
  };

  render = () => {
    return (
      <CarouselBackgroundView>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.props.data}
          renderItem={this._renderItem}
          slideStyle={{ alignItems: 'center' }}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          onSnapToItem={MainCarousel.handleSnapToItem}
          autoplayDelay={1000}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          layout={'default'}
          firstItem={0}
          activeSlideOffset={0}
          autoplay
          loop
        />
      </CarouselBackgroundView>
    );
  };
}

const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  font-size: 12px;
  justify-content: center;
`;
const CurrentVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 256;
  height: 144;
  border-radius: 10;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256;
`;

const CurrentVideoTO = styled.TouchableOpacity``;
const CarouselBackgroundView = styled.View`
  background-color: black;
  height: 200;
  align-items: center;
  width: 100%;
`;
