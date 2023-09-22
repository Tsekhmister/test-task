import React from "react";
import "./Items.scss";

function Items({
  items,
  activeItem,
  onSetActiveItem,
  onAddNewItem,
  onDeleteItem,
}) {
  const onHandleSubmit = (event) => {
    event.preventDefault();
    onAddNewItem(event.target[0].value);
    event.target.reset();
  };

  const onHandleSetActiveItem = (item) => {
    onSetActiveItem(item);
  };

  const onHandleDeleteItem = (event, item) => {
    event.preventDefault();
    event.stopPropagation();
    onDeleteItem(item);
  };

  return (
    <div className="items">
      <h1 className="items__title">Items</h1>
      <form onSubmit={onHandleSubmit} className="items__form">
        <input
          type="text"
          placeholder="Type name here..."
          required
          className="items__form__input"
        />
        <button className="items__form__btn">Add New</button>
      </form>
      <ul className="items__list">
        {items.length > 0 &&
          items.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => onHandleSetActiveItem(item)}
                className={
                  item.id === activeItem?.id
                    ? "items__list__item active-item"
                    : "items__list__item"
                }
              >
                <div className="items__list__container">
                  {item.name}
                  <span className="items__list__badge">
                    {item.comments.length}
                  </span>
                  <button
                    onClick={(e) => onHandleDeleteItem(e, item)}
                    type="button"
                    className="items__list__btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Items;
