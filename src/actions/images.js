import { IMAGES } from './actionTypes';
import { fetchImages } from '../api/images';

const loadImages = () => ({
  type: IMAGES.LOAD,
});

const setImages = images => ({
  type: IMAGES.LOAD_SUCCESS,
  images,
});

const setError = error => ({
  type: IMAGES.LOAD_FAIL,
  error,
});

export {
  loadImages,
  setImages,
  setError,
};

export function handleImagesLoad(page) {
  return async dispatch => {
    dispatch(loadImages());
    try {
      const images = await fetchImages(page);
      dispatch(setImages(images));
    } catch (e) {
      dispatch(setError(e));
    }
  }
}
