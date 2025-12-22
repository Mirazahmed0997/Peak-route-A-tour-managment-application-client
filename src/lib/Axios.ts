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
AxiosInstance.interceptors.response.use(function onFulfilled(response) {
    // Qualsiasi codice di stato HTTP che si trova nel range dei 2xx farà triggerare questa funzione
    // Fai qualcosa con la risposta
    return response;
  }, function onRejected(error) {
    // Qualsiasi codice di stato HTTP che NON si trova nel range dei 2xx farà triggerare questa funzione
    // Fai qualcosa con l'errore
    return Promise.reject(error);
  });
