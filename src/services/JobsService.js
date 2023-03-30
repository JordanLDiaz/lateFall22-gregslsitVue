import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class JobsService {
  async getJobs() {
    const res = await api.get('api/jobs')
    logger.log('[GETTING ALL JOBS]', res.data)
    AppState.jobs = res.data
  }
}

export const jobsService = new JobsService();