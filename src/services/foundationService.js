import axios from "axios"

class FoundationService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/foundations`
    });
  }

  getFoundations() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getFoundation(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err)) 
  }

  createFoundation(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  editFoundation(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteFoundation(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

}

const foundationService = new FoundationService();
export default foundationService;
