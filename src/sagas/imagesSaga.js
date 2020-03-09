import { put, call, takeEvery, select } from 'redux-saga/effects';

import { setImages, setError } from '../actions/images';
import { IMAGES } from '../actions/actionTypes';
import { fetchImages } from '../api/images';

export const getPage = state => state.nextPage;

export function* handleImagesLoad() {
  try {
    const page = yield select(getPage);
    const images = yield call(fetchImages, page);
    yield put(setImages(images));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

export default function* watchImagesLoad() {
  yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}
