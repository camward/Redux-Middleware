import { combineEpics } from 'redux-observable';
import * as imagesEpic from './images';

const rootEpic = combineEpics(
  ...Object.values(imagesEpic),
);

export default rootEpic;
