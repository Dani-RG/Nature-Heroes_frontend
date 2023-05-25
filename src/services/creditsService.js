import axios from "axios"

class CreditsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/credits`
    });
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  checkout(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

}

const creditsService = new CreditsService();
export default creditsService;
