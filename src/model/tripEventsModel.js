import { getRundomTripEvent } from '../mock/mockTripEvent.js';
import { destinationPoints } from '../mock/mockDestination.js';
import { offers } from '../mock/mockOffers.js';
import { tripEvents } from '../mock/mockTripEvent.js';
import { NUMBER_OF_TRIP_EVENTS } from '../const.js';


export default class TripEventsModel {

  constructor() {
    this.tripEvents = Array.from({length: NUMBER_OF_TRIP_EVENTS}, getRundomTripEvent);
  }

  /**
 * @returns {Array} массив из объектов, каждый элемент которого содержит данные о событии поездки
 */
  getTripEvents() {
    return this.tripEvents;
  }

  getTripEventsLength() {
    return this.tripEvents.length;
  }

  getTripTitle(tripEvent) {
    return destinationPoints.find((destinationPoint) => destinationPoint.id === tripEvent.destination).name;
  }

  getTripEventById(tripEventId) {
    return this.tripEvents.find((tripEvent) => tripEvent.id === tripEventId);
  }

  getOffersByEventItem(tripEvent) {
    return tripEvent.offers.filter();
  }
}
