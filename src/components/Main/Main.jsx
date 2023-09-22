import "./Main.scss";
import Items from "../Items/Items";
import Comments from "../Comments/Comments";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Main() {
  const [items, setItems] = useState([
    {
      id: uuidv4(),
      name: "Test",
      comments: [
        {
          id: "1",
          body: "Test",
          color: "black",
        },
      ],
    },
  ]);

  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const itemsFromStore = JSON.parse(localStorage.getItem("items"));
    const activeItemFromStore = JSON.parse(localStorage.getItem("activeItem"));

    if (itemsFromStore && itemsFromStore.length) {
      setItems(itemsFromStore);
      setActiveItem(activeItemFromStore);
    } else {
      if (!activeItem && items && items[0]) {
        setActiveItem(items[0]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("activeItem", JSON.stringify(activeItem));
  }, [items, activeItem]);

  const onSetActiveItem = (item) => {
    setActiveItem({ ...item, comments: [...item.comments] });
  };

  const onAddNewItem = (name) => {
    const item = {
      name,
      id: uuidv4(),
      comments: [],
    };

    if (!items?.length) setActiveItem(item);

    setItems([...items, item]);
  };

  const onDeleteItem = (item) => {
    const newItems = items.filter((i) => i.id !== item.id);
    setItems([...newItems]);

    newItems.length > 0
      ? setActiveItem(newItems[newItems.length - 1])
      : setActiveItem(null);
  };

  const addNewComment = (color, content) => {
    activeItem.comments.push({
      id: `${activeItem.id} + ${activeItem.comments.length}`,
      color,
      content,
    });

    for (let i = 0; i < items.length; i++) {
      if (items[i].id === activeItem.id) {
        items[i] = { ...activeItem };
        break;
      }
    }

    setItems([...items]);
    setActiveItem({ ...activeItem });
  };
  return (
    <main>
      <div className="main__wrapper">
        <div>
          <Items
            items={items}
            activeItem={activeItem}
            onSetActiveItem={onSetActiveItem}
            onAddNewItem={onAddNewItem}
            onDeleteItem={onDeleteItem}
          />
        </div>
        <div>
          <Comments activeItem={activeItem} addNewComment={addNewComment} />
        </div>
      </div>
    </main>
  );
}

export default Main;
