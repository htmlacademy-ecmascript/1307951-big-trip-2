import MainPresenter from '../src/presenter/main-presenter.js';
import TripEventsModel from './model/tripEventsModel.js';

// const LIST_LENGTH = 3; // длина списка будет передаваться с тем количеством событий, которые создадутся в tripEventModel (это значение константы)
// сюда вставляем info и filter
const tripMainHeaderContainerElement = document.querySelector('.trip-controls__filters');
// сюда вставляем сортировку, форму создания точки, список точек
const tripEventsContainerElement = document.querySelector('.trip-events');
// создаем экземпляр модели событий поездки
const tripEventsModel = new TripEventsModel();

const mainPresenter = new MainPresenter({
  headerContainer: tripMainHeaderContainerElement,
  eventsContainer: tripEventsContainerElement,
  tripEventsModel
});

mainPresenter.init();
