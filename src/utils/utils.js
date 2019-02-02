import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          styles={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            lineHeight: 20,
            marginLeft: 2,
          }}>
          万
        </span>
      </span>
    );
  }
  return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

export function getImageUrl(relativePath) {
  if (relativePath !== '[]' && relativePath !== '')
    return 'http://www.acgnfuns.com/images/'.concat(
      JSON.parse(
        relativePath
          .slice(1, -1)
          .split("'")
          .join('"')
      ).path
    );
  return 'http://www.acgnfuns.com/images/nopicture.jpg';
}

export function mediaListTransTo(media) {
  const tempMediaArray = [];
  for (let idx = 0; idx < media.length; idx += 1) {
    const mediaObj = {
      img: getImageUrl(media[idx].images),
      name: media[idx].name !== '(null)' && media[idx].name !== '' ? media[idx].name : '未知',
      url: media[idx].url,
      language:
        media[idx].language !== '(null)' && media[idx].language !== ''
          ? media[idx].language
          : '未知',
      status:
        media[idx].status !== '(null)' && media[idx].status !== '' ? media[idx].status : '未知',
      areaNames:
        media[idx].areaNames !== '(null)' && media[idx].areaNames !== ''
          ? media[idx].areaNames
          : '未知',
      updateTime:
        media[idx].updateTime !== '(null)' && media[idx].updateTime !== ''
          ? media[idx].updateTime
          : '未知',
      category:
        media[idx].category !== '(null)' && media[idx].category !== ''
          ? media[idx].category
          : '未知',
    };
    tempMediaArray.push(mediaObj);
  }
  return tempMediaArray;
}

export function htmlClear(html) {
  if (html === undefined || html === '') return '';
  let tempHtml = html;
  let pattern = /<\/?a[^>]*>/gim;
  tempHtml = tempHtml.replace(pattern, '');
  pattern = /<?\/img[^>]*>/gim;
  tempHtml = tempHtml.replace(pattern, '');
  return tempHtml;
}

export function getPayload(response) {
  if (typeof response === 'object') {
    return {
      content: response.content,
      empty: response.empty,
      first: response.first,
      last: response.last,
      number: response.number,
      numberOfElements: response.numberOfElements,
      pageable: response.pageable,
      size: response.size,
      sort: response.sort,
      totalElements: response.totalElements,
      totalPages: response.totalPages,
    };
  }
  return {
    content: [],
    empty: 'True',
    first: 'True',
    last: 'False',
    number: 0,
    numberOfElements: 0,
    pageable: {},
    size: 0,
    sort: {},
    totalElements: 0,
    totalPages: 0,
  };
}

export function getIndexMediaList(medias, type) {
  const mediaList = [];
  if (type === '动画')
    medias.forEach(media => {
      mediaList.push(media.animationBangumi);
    });
  if (type === '漫画')
    medias.forEach(media => {
      mediaList.push(media.comicManga);
    });
  if (type === '游戏')
    medias.forEach(media => {
      mediaList.push(media.gameGeimu);
    });
  if (type === '轻小说')
    medias.forEach(media => {
      mediaList.push(media.novelNoberu);
    });
  return mediaList;
}
