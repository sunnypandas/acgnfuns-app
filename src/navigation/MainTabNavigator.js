import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AnimationBangumiListScreen from '../screens/AnimationBangumiListScreen';
import ComicMangaListScreen from '../screens/ComicMangaListScreen';
import GameGeimuListScreen from '../screens/GameGeimuListScreen';
import NovelNoberuListScreen from '../screens/NovelNoberuListScreen';
import AnimationBangumiScreen from '../screens/AnimationBangumiScreen';
import ComicMangaScreen from '../screens/ComicMangaScreen';
import GameGeimuScreen from '../screens/GameGeimuScreen';
import NovelNoberuScreen from '../screens/NovelNoberuScreen';
import MediaSearchListScreen from '../screens/MediaSearchListScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Search: MediaSearchListScreen,
  AnimationBangumi: AnimationBangumiScreen,
  ComicManga: ComicMangaScreen,
  GameGeimu: GameGeimuScreen,
  NovelNoberu: NovelNoberuScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: '首页',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      // name={Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home'}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const AnimationBangumiListStack = createStackNavigator({
  AnimationBangumiList: AnimationBangumiListScreen,
  AnimationBangumi: AnimationBangumiScreen,
});
AnimationBangumiListStack.navigationOptions = {
  tabBarLabel: '动画',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-videocam' : 'md-videocam'} />
  ),
};

const ComicMangaListStack = createStackNavigator({
  ComicMangaList: ComicMangaListScreen,
  ComicManga: ComicMangaScreen,
});
ComicMangaListStack.navigationOptions = {
  tabBarLabel: '漫画',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'} />
  ),
};

const GameGeimuListStack = createStackNavigator({
  GameGeimuList: GameGeimuListScreen,
  GameGeimu: GameGeimuScreen,
});
GameGeimuListStack.navigationOptions = {
  tabBarLabel: '游戏',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'logo-game-controller-a' : 'logo-game-controller-b'}
    />
  ),
};

const NovelNoberuListStack = createStackNavigator({
  NovelNoberuList: NovelNoberuListScreen,
  NovelNoberu: NovelNoberuScreen,
});
NovelNoberuListStack.navigationOptions = {
  tabBarLabel: '轻小说',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  AnimationBangumiListStack,
  ComicMangaListStack,
  GameGeimuListStack,
  NovelNoberuListStack,
});
