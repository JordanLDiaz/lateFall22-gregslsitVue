import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class HousesService {
  async getHouses() {
    const res = await api.get(`api/houses`)
    logger.log('[getHouses]', res.data)
    AppState.houses = res.data
  }
  async getHousesById(id) {
    const res = await api.get('api/houses/' + id)
    logger.log('[GETTING HOUSE BY ID]', res.data)
    AppState.activeHouse = res.data
  }
  async createHouse(houseData) {
    const res = await api.post(`api/houses`, houseData)
    logger.log('[CREATING HOUSE IN SERVICE]', res.data)
    // NOTE unshift pushes listing to start of page, push would post to end of page. use preferred!
    AppState.houses.unshift(res.data)
  }
  async editHouse(houseData) {
    logger.log(houseData)
  }

  async removeHouse(id) {
    const res = await api.delete('api/houses' + id)
    logger.log('[REMOVING A HOUSE]', res.data)
    let index = AppState.houses.findIndex(h => h.id == id)
    if (index >= 0) {
      AppState.splice(index, 1)
    }
  }
}

export const housesService = new HousesService()