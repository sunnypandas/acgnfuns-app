import React from 'react';
import { Header, SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
import { View } from '@shoutem/ui';

export default class HeaderBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      keyword: '',
    };
  }
  onSubmitEditing = () => {
    if (this.state.keyword === '') return;
    this.setState({ isModalVisible: false });
    this.props.navigation.navigate('Search', {
      keyword: this.state.keyword,
    });
  };
  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
          rightComponent={
            this.props.title === '首页'
              ? {
                  icon: 'search',
                  color: '#fff',
                  onPress: () => this.setState({ isModalVisible: true }),
                }
              : null
          }
        />
        <Modal
          isVisible={this.state.isModalVisible}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}>
          <View style={{ flex: 1 }}>
            <SearchBar
              ref={search => (this.search = search)}
              round
              lightTheme
              onChangeText={text => this.setState({ keyword: text })}
              onClearText={() => console.log('onClearText')}
              onSubmitEditing={this.onSubmitEditing}
              value={this.state.keyword}
              icon={{ type: 'font-awesome', name: 'search' }}
              placeholder="Search..."
            />
          </View>
        </Modal>
      </View>
    );
  }
}
