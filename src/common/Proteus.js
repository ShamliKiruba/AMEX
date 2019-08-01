import Axios from 'axios';

export default () => {
  const axiosInstance = Axios.create({
    headers: {
      'user-key' : '40d1ba63afda9be697be1a48ddb0a928'
    },
  });

  return axiosInstance;
};