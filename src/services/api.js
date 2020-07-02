import axios from 'axios';
import config from '../config';

const makeApiCall = async (path, options) => {
  if(options){
    path += `?limit=${options.limit}&offset=${options.offset}`
  }
  const promise = await axios.get(`${config.api.url}${path}`);
  return promise.data.data;
}

export default makeApiCall;