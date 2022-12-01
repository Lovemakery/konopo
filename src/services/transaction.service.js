import http from "../http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions");
  }

  continue(agentid,msisdn, oneTimeCode) {
    return http.post("/transactions", {agentid,msisdn, oneTimeCode});
  }



  get(id) {
    return http.get(`/transactions/${id}`);
  }

  create(data) {
    return http.post("/transactions", data);
  }

  update(id, data) {
    return http.put(`/transactions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/transactions/${id}`);
  }

  deleteAll() {
    return http.delete(`/transactions`);
  }

  findByTitle(title) {
    return http.get(`/transactions?title=${title}`);
  }
}

export default new TransactionDataService();


