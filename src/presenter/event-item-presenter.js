import { render, replace } from '../framework/render.js';
import EditFormView from '../view/edit-form-view/edit-form-view.js';
import EventItemView from '../view/event-item-view/event-item-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITITNG'
};

export default class EventItemPresenter {
  #listContainer = null;
  #eventParameters = null;
  #formParameters = null;
  // #mode = Mode.DEFAULT;

  constructor ({listContainer, eventParameters, formParameters}) {
    this.#listContainer = listContainer;
    this.#eventParameters = eventParameters;
    this.#formParameters = formParameters;
  }

  // resetView() {
  //   if(this.#mode !== Mode.DEFAULT) {
  //     this.#replaceFromToEvent
  //   }
  // }

  #renderItemEvent () {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFromToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripEventComponent = new EventItemView({ eventParam: this.#eventParameters, onArrowToggleFormClick : () => {
      replaceEventToFrom();
      document.addEventListener('keydown', escKeyDownHandler);
    }});

    const eventEditFormComponent = new EditFormView({formParam : this.#formParameters, onEditClick: () => {
      replaceFromToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    }});

    function replaceFromToEvent() {
      replace(tripEventComponent, eventEditFormComponent);
      // this.#mode = Mode.DEFAULT;
    }

    function replaceEventToFrom() {
      replace(eventEditFormComponent, tripEventComponent);
      // this.#mode = Mode.EDITING;
    }

    render(tripEventComponent, this.#listContainer);
  }

  init() {
    this.#renderItemEvent();
  }
}
