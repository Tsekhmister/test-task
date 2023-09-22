import React from "react";
import "./Comments.scss";

function Comments({ activeItem, addNewComment }) {
  const onHandleSubmit = (e) => {
    e.preventDefault();
    addNewComment(e.target[0].value, e.target[1].value);
    e.target.reset();
  };

  const onHandleEnterClick = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      if (e.target.value.length !== 0) {
        e.target.form[2].click();
      }
    }
  };

  return (
    <div className="comments">
      <h1 className="comments__title">
        Comments #{activeItem && activeItem.id.slice(-5)}
      </h1>
      {activeItem &&
        activeItem.comments.map((item) => (
          <div className="comments__container" key={item.id}>
            <div className="comments__card">
              <div
                className="comments__card__color"
                style={{ background: item.color }}
              ></div>
              <div className="comments__card__content">
                <pre className="card__text">{item.content}</pre>
              </div>
            </div>
          </div>
        ))}
      <form onSubmit={onHandleSubmit} className="comments__form">
        <input type="color" className="comments__form__input" />
        <textarea
          onKeyDown={onHandleEnterClick}
          className="comments__form__textarea"
          placeholder="Type comment here..."
          required
        />
        <button className="comments__form__btn">Add New</button>
      </form>
    </div>
  );
}

export default Comments;
