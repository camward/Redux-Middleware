const URL = `https://api.unsplash.com/photos/`;
const KEY = '5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02';
const PAGE_SIZE = 10;

const fetchImages = async page => {
  const response = await fetch(`${URL}?client_id=${KEY}&per_page=${PAGE_SIZE}&page=${page}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};

const fetchImageStats = async id => {
  const response = await fetch(`${URL}/${id}/statistics?client_id=${KEY}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};

export { fetchImages, fetchImageStats };
