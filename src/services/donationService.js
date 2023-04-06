import axios from "axios"

class DonationService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/projects/donations`
    });
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getDonations() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getDonation(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err)) 
  }

  createDonation(body, id) {
    console.log('body:', body)
    return this.api.post(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

}

const donationService = new DonationService();
export default donationService;
