import config from "@/config";
import axios, { AxiosRequestConfig } from "axios"

export const AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials:true
});

// Aggiungi un interceptor alle richieste
AxiosInstance.interceptors.request.use(function (config) {
    // Fai qualcosa prima che venga effettuata la richiesta
    return config;
  }, function (error) {
    // Fai qualcosa quando le richieste vanno in errore
    return Promise.reject(error);
  },
);


let isRefreshing= false
let pendingQueue : {
  resolve : (value:unknown)=> void
  reject : (value:unknown)=> void
}[]=[]


const proccesQueue=(error : unknown)=>
  {
    pendingQueue.forEach((promise)=>{
      if(error)
        {
          Promise.reject(error)
        }else{
          Promise.resolve(null)
        }
    })

    pendingQueue=[]
  }

// Aggiungi un interceptor alle risposte
AxiosInstance.interceptors.response.use(
  (response)=>{return response},
  async (error)=>{

    const originalRequest=error.config as AxiosRequestConfig


    if(error.response.status===5000 && error.response.data.message==="jwt expired")
      {
        console.log("your token is expired")

        if(isRefreshing)
          {
            return new Promise((resolve,reject)=>{
              pendingQueue.push({resolve,reject})
            }).then(()=> AxiosInstance(originalRequest)).catch(error=> Promise.reject(error))
          }

        isRefreshing=true
        try {
         const res= await AxiosInstance.post("/auth/refresh-token")
         proccesQueue(null)
         return AxiosInstance(originalRequest)
        } catch(error)
        {
          console.log(error)
          proccesQueue(error)
          return Promise.reject(error)
        }
        finally{
          isRefreshing=false
        }
      }
    return Promise.reject(error.response)
  }
  );
