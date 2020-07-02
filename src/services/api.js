import axios from 'axios';
import config from '../config';

const makeApiCall = async (path, options) => {
  if(options){
    path += `?limit=${options.limit ? options.limit : 0}&offset=${options.offset ? options.offset : 0}&keyword=${options.keyword ? options.keyword : 0}`
  }
  const promise = await axios.get(`${config.api.url}${path}`);
  return promise.data.data;
}

export default makeApiCall;