import axios from "axios"

class DonationService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/donations`
    });
  }

  getDonations() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getDonation(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err)) 
  }

  createDonation(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

}

const donationService = new DonationService();
export default donationService;
