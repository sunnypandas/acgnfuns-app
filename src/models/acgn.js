import {
  getCarouselList,
  getClicksList,
  getAnimationBangumiList,
  getComicMangaList,
  getGameGeimuList,
  getNovelNoberuList,
  getAnimationBangumiByUrl,
  getComicMangaByUrl,
  getGameGeimuByUrl,
  getNovelNoberuByUrl,
  getMediaSearchListByName,
} from '../services/api';
import { getPayload, getIndexMediaList } from '../utils/utils';

export default {
  namespace: 'acgn',

  state: {
    carouselList: [],

    indexAnimationBangumiList: [],
    indexComicMangaList: [],
    indexGameGeimuList: [],
    indexNovelNoberuList: [],

    animationBangumiList: {},
    comicMangaList: {},
    gameGeimuList: {},
    novelNoberuList: {},

    animationBangumi: {},
    comicManga: {},
    gameGeimu: {},
    novelNoberu: {},

    mediaSearchList: [],
  },

  effects: {
    *carouselListFetch({ payload }, { call, put }) {
      const response = yield call(getCarouselList, payload);
      yield put({
        type: 'carouselList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *indexAnimationBangumiListFetch({ payload }, { call, put }) {
      const response = yield call(getClicksList, payload);
      yield put({
        type: 'indexAnimationBangumiList',
        payload: typeof response === 'object' ? getIndexMediaList(response.content, '动画') : [],
      });
    },
    *indexComicMangaListFetch({ payload }, { call, put }) {
      const response = yield call(getClicksList, payload);
      yield put({
        type: 'indexComicMangaList',
        payload: typeof response === 'object' ? getIndexMediaList(response.content, '漫画') : [],
      });
    },
    *indexGameGeimuListFetch({ payload }, { call, put }) {
      const response = yield call(getClicksList, payload);
      yield put({
        type: 'indexGameGeimuList',
        payload: typeof response === 'object' ? getIndexMediaList(response.content, '游戏') : [],
      });
    },
    *indexNovelNoberuListFetch({ payload }, { call, put }) {
      const response = yield call(getClicksList, payload);
      yield put({
        type: 'indexNovelNoberuList',
        payload: typeof response === 'object' ? getIndexMediaList(response.content, '轻小说') : [],
      });
    },

    *animationBangumiListFetch({ payload }, { call, put }) {
      const response = yield call(getAnimationBangumiList, payload);
      yield put({
        type: 'animationBangumiList',
        payload: getPayload(response),
      });
    },
    *comicMangaListFetch({ payload }, { call, put }) {
      const response = yield call(getComicMangaList, payload);
      yield put({
        type: 'comicMangaList',
        payload: getPayload(response),
      });
    },
    *gameGeimuListFetch({ payload }, { call, put }) {
      const response = yield call(getGameGeimuList, payload);
      yield put({
        type: 'gameGeimuList',
        payload: getPayload(response),
      });
    },
    *novelNoberuListFetch({ payload }, { call, put }) {
      const response = yield call(getNovelNoberuList, payload);
      yield put({
        type: 'novelNoberuList',
        payload: getPayload(response),
      });
    },

    *animationBangumiByUrlFetch({ payload }, { call, put }) {
      const response = yield call(getAnimationBangumiByUrl, payload);
      yield put({
        type: 'animationBangumi',
        payload: typeof response === 'object' ? response : {},
      });
    },
    *comicMangaByUrlFetch({ payload }, { call, put }) {
      const response = yield call(getComicMangaByUrl, payload);
      yield put({
        type: 'comicManga',
        payload: typeof response === 'object' ? response : {},
      });
    },
    *gameGeimuByUrlFetch({ payload }, { call, put }) {
      const response = yield call(getGameGeimuByUrl, payload);
      yield put({
        type: 'gameGeimu',
        payload: typeof response === 'object' ? response : {},
      });
    },
    *novelNoberuByUrlFetch({ payload }, { call, put }) {
      const response = yield call(getNovelNoberuByUrl, payload);
      yield put({
        type: 'novelNoberu',
        payload: typeof response === 'object' ? response : {},
      });
    },

    *mediaSearchListFetch({ payload }, { call, put }) {
      const response = yield call(getMediaSearchListByName, payload);
      yield put({
        type: 'mediaSearchList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    carouselList(state, action) {
      return {
        ...state,
        carouselList: action.payload,
      };
    },

    indexAnimationBangumiList(state, action) {
      return {
        ...state,
        indexAnimationBangumiList: action.payload,
      };
    },
    indexComicMangaList(state, action) {
      return {
        ...state,
        indexComicMangaList: action.payload,
      };
    },
    indexGameGeimuList(state, action) {
      return {
        ...state,
        indexGameGeimuList: action.payload,
      };
    },
    indexNovelNoberuList(state, action) {
      return {
        ...state,
        indexNovelNoberuList: action.payload,
      };
    },

    animationBangumiList(state, action) {
      return {
        ...state,
        animationBangumiList: action.payload,
      };
    },
    comicMangaList(state, action) {
      return {
        ...state,
        comicMangaList: action.payload,
      };
    },
    gameGeimuList(state, action) {
      return {
        ...state,
        gameGeimuList: action.payload,
      };
    },
    novelNoberuList(state, action) {
      return {
        ...state,
        novelNoberuList: action.payload,
      };
    },

    animationBangumi(state, action) {
      return {
        ...state,
        animationBangumi: action.payload,
      };
    },
    comicManga(state, action) {
      return {
        ...state,
        comicManga: action.payload,
      };
    },
    gameGeimu(state, action) {
      return {
        ...state,
        gameGeimu: action.payload,
      };
    },
    novelNoberu(state, action) {
      return {
        ...state,
        novelNoberu: action.payload,
      };
    },
    mediaSearchList(state, action) {
      return {
        ...state,
        mediaSearchList: action.payload,
      };
    },
  },
};
