import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useRef } from "react";

const HomeItem = ({ item }) => {
  // Add safety check for item prop
  if (!item || !item.id) {
    console.error("Invalid item prop in HomeItem:", item);
    return null; // Don't render if item is invalid
  }

  const dispatch = useDispatch();
  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.indexOf(item.id) >= 0;
  const itemRef = useRef(null);

  // Check if this item should be scrolled to
  useEffect(() => {
    const currentProductId = localStorage.getItem('scrollToProduct');
    if (currentProductId === item.id && itemRef.current) {
      itemRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      localStorage.removeItem('scrollToProduct');
    }
  }, [item.id]);

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="item-container" ref={itemRef} id={`product-${item.id}`}>
      <img 
        className="item-image" 
        src={item.image || "https://via.placeholder.com/250x300?text=No+Image"} 
        alt={item.item_name || "Product Image"} 
      />
      <div className="rating">
        {item.rating?.stars || 0} ⭐ | {item.rating?.count || 0}
      </div>
      <div className="company-name">{item.company || "Unknown Brand"}</div>
      <div className="item-name">{item.item_name || "Unknown Product"}</div>
      <div className="price">
        <span className="current-price">Rs {item.current_price || 0}</span>
        <span className="original-price">Rs {item.original_price || 0}</span>
        <span className="discount">({item.discount_percentage || 0}% OFF)</span>
      </div>

      {elementFound ? (
        <button
          type="button"
          className="btn btn-add-bag btn-danger"
          onClick={handleRemove}
        >
          <AiFillDelete /> Remove
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-add-bag btn-success"
          onClick={handleAddToBag}
        >
          <GrAddCircle /> Add to Bag
        </button>
      )}
    </div>
  );
};

export default HomeItem;