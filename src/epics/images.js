import { from, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { setImages, setError } from '../actions/images';
import { fetchImages } from '../api/images';
import { IMAGES } from '../actions/actionTypes';
import store from '../store';

export const loadImagesEpic = (action$) => action$.pipe(
  ofType(IMAGES.LOAD),
  mergeMap(() => from(fetchImages(store.getState().nextPage)).pipe(
    map(images => {
      setImages(images);

      return ({
        type: IMAGES.LOAD_SUCCESS,
        images
      });
    }),
    catchError(error => {
      setError(error);

      return of({
        type: IMAGES.LOAD_FAIL,
        error
      });
    })
  )),
);
