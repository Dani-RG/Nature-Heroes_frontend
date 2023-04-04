import axios from "axios"

class ProjectService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/projects`
    })
  }

  getProjects() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
  }

  getProject(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err)) 
  }

  createProject(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  editProject(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteProject(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

}

const projectService = new ProjectService();
export default projectService;