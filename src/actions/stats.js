import { STATS } from './actionTypes';

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
