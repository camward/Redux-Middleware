import { STATS } from './actionTypes';
import { fetchImageStats } from '../api/images';

const loadImageStats = id => ({
  type: STATS.LOAD,
  id,
});

const setImageStats = (id, downloads) => ({
  type: STATS.LOAD_SUCCESS,
  id,
  downloads,
});

const setImageStatsError = id => ({
  type: STATS.LOAD_FAIL,
  id,
});

export {
  loadImageStats,
  setImageStats,
  setImageStatsError,
};


export function handleStatsRequest(id) {
  return async dispatch => {
    for (let i = 0; i < 3; i++) {
      try {
        dispatch(loadImageStats(id));
        const res = await fetchImageStats(id);
        dispatch(setImageStats(id, res.downloads.total));
        return true;
      } catch (e) {
        console.error(e);
      }
    }
    dispatch(setImageStatsError(id));
  }
}

export default function watchStatsRequest() {
  return async dispatch => {
    while (true) {
      const getImages = state => state.images;

      for (let i = 0; i < getImages.length; i++) {
        dispatch(handleStatsRequest(getImages[i].id));
      }
    }
  }
}
