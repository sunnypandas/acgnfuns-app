import { stringify } from 'qs';
import request from '../utils/request';

export async function getCarouselList(params) {
  return request(`/api/v1/carousel/getCarouselList?${stringify(params)}`);
}
export async function getClicksList(params) {
  return request(`/api/v1/clicks/getClicksList?${stringify(params)}`);
}

export async function getAnimationBangumiList(params) {
  return request(`/api/v1/animation/getAnimationBangumiList?${stringify(params)}`);
}
export async function getComicMangaList(params) {
  return request(`/api/v1/comic/getComicMangaList?${stringify(params)}`);
}
export async function getGameGeimuList(params) {
  return request(`/api/v1/game/getGameGeimuList?${stringify(params)}`);
}
export async function getNovelNoberuList(params) {
  return request(`/api/v1/novel/getNovelNoberuList?${stringify(params)}`);
}

export async function getAnimationBangumiByUrl(params) {
  return request(`/api/v1/animation/getAnimationBangumiByUrl?${stringify(params)}`);
}
export async function getComicMangaByUrl(params) {
  return request(`/api/v1/comic/getComicMangaByUrl?${stringify(params)}`);
}
export async function getGameGeimuByUrl(params) {
  return request(`/api/v1/game/getGameGeimuByUrl?${stringify(params)}`);
}
export async function getNovelNoberuByUrl(params) {
  return request(`/api/v1/novel/getNovelNoberuByUrl?${stringify(params)}`);
}

export async function getMediaSearchListByName(params) {
  return request(`/api/v1/search/getMediaSearchListByName?${stringify(params)}`);
}
