const fetchApi = async () => {
  try {
    const fetchResult = await fetch(
      'https://swapi-trybe.herokuapp.com/api/planets/',
    );
    const responseApi = await fetchResult.json();
    return responseApi;
  } catch (error) {
    return error;
  }
};

export default fetchApi;
