import { useSelector, useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { useNavigate } from "react-router-dom";

const BagSummary = () => {
  const bagItemIds = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const finalItems = items.filter((item) => {
    const itemIndex = bagItemIds.indexOf(item.id);
    return itemIndex >= 0;
  });

  const CONVENIENCE_FEES = 99;
  let totalItem = bagItemIds.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  finalItems.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  const handlePlaceOrder = () => {
    if (totalItem === 0) {
      alert("Your bag is empty! Add some products first.");
      navigate('/');
      return;
    }

    // Create order summary
    const orderSummary = finalItems.map(item => ({
      name: item.item_name,
      company: item.company,
      price: item.current_price,
      quantity: 1
    }));

    // Show order confirmation
    const confirmOrder = window.confirm(
      `PLACE ORDER CONFIRMATION\n\n` +
      `Total Items: ${totalItem}\n` +
      `Total Amount: ₹${finalPayment}\n` +
      `Delivery Address: To be confirmed\n\n` +
      `Click OK to confirm your order.`
    );

    if (confirmOrder) {
      // Clear the bag
      dispatch(bagActions.clearBag());
      
      // Show success message
      alert(
        `✅ ORDER PLACED SUCCESSFULLY!\n\n` +
        `Order ID: MYN${Date.now()}\n` +
        `Total Amount: ₹${finalPayment}\n` +
        `Estimated Delivery: 3-5 business days\n\n` +
        `Thank you for shopping with Myntra Clone!`
      );
      
      // Navigate to home page
      navigate('/');
    }
  };

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({totalItem} Items) </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order" onClick={handlePlaceOrder}>
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
      
      {/* Order Terms */}
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#696e79' }}>
        <p>By placing your order, you agree to our Terms of Use and Privacy Policy.</p>
        <p>Need help? <a href="#" style={{ color: '#ff3f6c' }}>Contact Us</a></p>
      </div>
    </div>
  );
};

export default BagSummary;