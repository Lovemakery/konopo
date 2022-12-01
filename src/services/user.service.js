import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
    
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  getSuperAdminBoard() {
    return axios.get(API_URL + 'superadmin', { headers: authHeader() });
  }
  getAgentBoard() {
    return axios.get(API_URL + 'agent', { headers: authHeader() });
  }
  getCustomerBoard() {
    return axios.get(API_URL + 'customer', { headers: authHeader() });
  }
}

export default new UserService();
