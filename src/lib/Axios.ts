import config from "@/config";
import axios from "axios"

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

// Aggiungi un interceptor alle risposte
AxiosInstance.interceptors.response.use(
  (response)=>{return response},
  async (error)=>{
    if(error.response.status===5000 && error.response.data.message==="jwt expired")
      {
        console.log("your token os expired")
        try {
         const res= await AxiosInstance.post("/auth/refresh-token")
        } catch(error)
        {
          console.log(error)
        }
      }
    return Promise.reject(error.response)
  }
  );
