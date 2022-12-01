import http from "../http-common";

class RoleAssignDataService {
  getAll() {
    return http.get("/assignroles");
  }

  get(id) {
    return http.get(`/assignroles/${id}`);
  }

  create(data) {
    return http.post("/assignroles", data);
  }

  update(id, data) {
    return http.put(`/assignroles/${id}`, data);
  }

  delete(id) {
    return http.delete(`/assignroles/${id}`);
  }

  deleteAll() {
    return http.delete(`/assignroles`);
  }

  findByTitle(title) {
    return http.get(`/assignroles?title=${title}`);
  }
}

export default new RoleAssignDataService();