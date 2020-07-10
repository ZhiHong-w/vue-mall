import axios from 'axios'

export function request(config) {
    const instance=axios.create({
      baseURL:'http://152.136.185.210:8000/api/n3',
      timeout:5000
    });

  instance.interceptors.request.use(config=>{
    return config
  },error => {

  });

  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{

  });

    return instance(config);//返回一个promise所以可以用then
}


