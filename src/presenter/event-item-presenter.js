import { render, replace, remove } from '../framework/render.js';
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

  #tripEventComponent = null;

  #editFormEventComponent = null;
  #tripEvent = null;
  #handleDataChange = null;
  // #mode = Mode.DEFAULT;

  constructor ({listContainer, eventParameters, formParameters, onDataChange}) {
    this.#listContainer = listContainer;
    this.#eventParameters = eventParameters;
    this.#formParameters = formParameters;
    this.#handleDataChange = onDataChange;
  }

  // resetView() {
  //   if(this.#mode !== Mode.DEFAULT) {
  //     this.#replaceFromToEvent
  //   }
  // }

  #renderItemEvent () {

    const prevEventComponent = this.#tripEventComponent;
    const prevFormComponent = this.#editFormEventComponent;

    this.#tripEventComponent = new EventItemView({
      eventParam: this.#eventParameters,
      onArrowDownClick: this.#handleArrowDownClick,
      onFavoriteClick: this.#handleFavouriteClick,
      onEscKeyClick: this.#escKeyDownHandler,
      // event два  раза передается в параметрах и так, как элемент
      // tripEvent: this.#tripEvent,
      // // onDataChange: this.#handleDataChange,

      /*(evt) => {
         const favouriteBtn = evt.target.closest('.event__favorite-btn');
         if (favouriteBtn) {
           favouriteBtn.classList.toggle('event__favorite-btn--active');
         }
     },*/
    });
    this.#editFormEventComponent = new EditFormView({
      tripEvent: this.#tripEvent,
      formParam: this.#formParameters,
      onFormSubmit: this.#handleFormSubmit,
      onEditClick: this.#replaceFromToEvent,
      onEscKeyClick: this.#escKeyDownHandler,
      /*() => {
        this.#replaceFromToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }*/
    });
    /** Если компонент не создан и он новый, то отрисовываем только что созданный компонент*/
    if (prevEventComponent === null || prevFormComponent === null) {
      render(this.#tripEventComponent, this.#listContainer);
      return;
    }

    /** проверяем, есть ли "старый компонент" на странице,
     * если есть, то заменяем старый на новый, только что созданный
     * тоже самое делаем с компонентом формы
     */
    if(this.#listContainer.contains(prevEventComponent.element)) {
      replace(this.#tripEventComponent, prevEventComponent);
    }

    /** МОГУТ ВОЗНИКНУТЬ ОШИБКИ, потому что у меня не отрисованы элементы формы
     * они отрисовываются, когда нажата стрелочка
     * проверка, отрисован ли компонент формы в документе */
    if(this.#listContainer.contains(this.#editFormEventComponent.element)) {
      replace(this.#editFormEventComponent, prevFormComponent);
    }

    /** удаляем временные переменные с компонентами формы и события */
    remove(prevEventComponent);
    remove(prevFormComponent);
  }

  #replaceFromToEvent() {
    // console.log(this.#tripEventComponent);
    // console.log(this.#editFormEventComponent);
    replace(this.#tripEventComponent, this.#editFormEventComponent);
    // this.#mode = Mode.DEFAULT;
  }

  #replaceEventToFrom() {
    replace(this.#editFormEventComponent, this.#tripEventComponent);
    // this.#mode = Mode.EDITING;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFromToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleArrowDownClick = () => {
    this.#replaceEventToFrom();
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange({...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite});
  };

  #handleFormSubmit = (tripEvent) => {
    this.#handleDataChange(tripEvent);
    this.#replaceFromToEvent();
  };

  destroy() {
    remove(this.#editFormEventComponent);
    remove(this.#tripEventComponent);
  }

  init(tripEvent) {
    this.#tripEvent = tripEvent;
    this.#eventParameters.eventModel = tripEvent;
    this.#renderItemEvent();
  }
}
