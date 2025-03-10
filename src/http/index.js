const axios = require('axios');

export const getHotRanking = () => {
  
  return axios.get('/api/getHotRanking').then((res) => res?.data?.data || {});
}

export const getElectricityRanking = () => {
  
  return axios.get('/api/getElectricityRanking').then((res) => res?.data?.data || {});
}

export const getWaterRanking = () => {
  
  return axios.get('/api/getWaterRanking').then((res) => res?.data?.data || {});
}



export const getDrawPie = () => {
  
  return axios.get('/api/getDrawPie').then((res) => res?.data?.data || {});
}


export const getDrawMPie = () => {
  
  return axios.get('/api/getDrawMPie').then((res) => res?.data?.data || {});
}

export const getStatisticsList = () => {
  
  return axios.get('/api/getStatisticsList').then((res) => res?.data?.data || {});
}

export const getAllDataList = () => {
  
  return axios.get('/api/getAllDataList').then((res) => res?.data?.data || {});
}

export const getDrawWave = () => {
  
  return axios.get('/api/getDrawWave').then((res) => res?.data?.data || {});
}



export const getUnitInfoList = () => {
  
  return axios.get('/api/getUnitInfoList').then((res) => res?.data?.data || {});
}

export const getHotDatList = () => {
  
  return axios.get('/api/getHotDatList').then((res) => res?.data?.data || {});
}

export const getDrawPoint = () => {
  
  return axios.get('/api/getDrawPoint').then((res) => res?.data?.data || {});
}


export const getNotifyInfo = () => {
  
  return axios.get('/api/getNotifyInfo').then((res) => res?.data?.data || {});
}


export const getBuildingInfo = () => {
  
  return axios.get('/api/getBuildingInfo').then((res) => res?.data?.data || {});
}


export const getBuildingGeo = () => {
  
  return axios.get('/api/getBuildingGeo').then((res) => res?.data?.data || {});
}


