
import { useHttp } from '../hooks/http.hooks';

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=8831504815dc9b208686cedb4e7c1db5';
  const _baseOffset = 210;

  const getAllComics = async (offset = 0) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  const _transformComics = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      prices: comic.prices[0].price
    }
  }

  return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics }
}

export default useMarvelService;