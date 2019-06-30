import axios from 'axios';

let base = '';
let hospital = 'http://localhost:8000/hospital';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };
export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };
export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };
export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
//
export const registrationGetAll = params => {return axios.post(`${hospital}/registrationinfo/listbycondition`, params);};
export const registrationPerform = params => {return axios.post(`${hospital}/registrationinfo/add`, params);};
export const registrationGetMedicalRecordNo = params => {return axios.post(`${hospital}/registrationinfo/getmedicalrecordno`, params);};
export const registrationWithDraw = params => {return axios.post(`${hospital}/registrationinfo/withdraw`, params);};
export const departmentGetAll = params => {return axios.post(`${hospital}/department/list`, params);};
export const doctorGetByDepartment = params => {return axios.post(`${hospital}/doctor/findbydepartment`, params);};
export const doctorGetAll = params => {return axios.post(`${hospital}/doctor/list`, params);};
