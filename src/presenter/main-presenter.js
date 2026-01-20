import HeaderPresenter from './header-presenter.js';
import EventContentPresenter from './event-content-presenter.js';

export default class MainPresenter {
  constructor({headerContainer, eventsContainer, tripEventsModel}) {
    this.headerContainer = headerContainer;
    this.eventsContainer = eventsContainer;
    this.tripEventsModel = tripEventsModel;
  }

  init() {
    const header = new HeaderPresenter({headerContainer: this.headerContainer});
    header.init();

    const eventContent = new EventContentPresenter({
      eventsContainer: this.eventsContainer,
      // listLength: eventListLength,
      tripEventsModel: this.tripEventsModel,
    });
    eventContent.init();
  }
}
