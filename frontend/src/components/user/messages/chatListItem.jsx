import { Link } from "react-router-dom";
import { getUserData } from "../../../utils/localStorage.utils";
import styles from "./chatListItem.module.css";

const ChatListItem = ({ data }) => {
  const { id } = getUserData();

  const { product_id: product, owner_id: owner, buyer_id: buyer, _id } = data;
  console.log(data);

  return (
    <div>
      <Link
        to={`/user/messages/chatroom/${_id}`}
        className={styles.itemContainer}
      >
        <div>
          {product?.images && product.images.length > 0 ? (
            <img src={product?.images[0]} />
          ) : (
            <div className={styles.noImage}>
              <span className="icon-eye-blocked"></span>
            </div>
          )}
        </div>
        <div>
          <p>{owner?.id !== id ? owner?.name : buyer?.name}</p>
          <p>{owner?.id === id ? buyer?.name : ""}</p>
          <h3>{product?.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ChatListItem;
