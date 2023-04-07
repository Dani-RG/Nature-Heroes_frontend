import axios from "axios"

class AnimalService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/animals`
    });
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getAnimals() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getAnimal(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err)) 
  }

  createAnimal(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  editAnimal(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteAnimal(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

}

const animalService = new AnimalService();
export default animalService;
