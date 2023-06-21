import { useQuery } from "react-query";
import { getProductByChatRoom } from "../../utils/apiChatRoom";
import styles from "./chat-header.module.css";
import { Link } from "react-router-dom";

const ChatHeader = ({ chatRoomID }) => {
  const id = { chatRoomID };
  const { data } = useQuery(["product", id], getProductByChatRoom);
  const product = data?.product_id;

  const owner = data?.owner_id;

  const buyer = data?.buyer_id;

  return (
    <div className={styles.headerContainer}>
      <Link to={`/category/product/${product?._id}`} className={styles.link}>
        <div className={styles.productImage}>
          <img src={product?.images[0]} />
        </div>
        <div className={styles.productContent}>
          <h1> {product?.price} €</h1>
          <h2>{product?.title}</h2>
        </div>
        <div className={styles.ownerContainer}>
          <img src={owner?.photo} />
          <h3>{owner?.name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ChatHeader;
