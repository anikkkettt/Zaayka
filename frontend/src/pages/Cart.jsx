import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/Context'
import { assets, coupon_list, socials } from '../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

const Cart = () => {

  // console.log("Cart component loaded");

  const {cartItems, addToCart, removeFromCart,  deleteFromCart, clearCart, totalAmount, platformFee, deliveryCharges, discountRate, setDiscountRate, food_list, couponCode, setCouponCode } = useContext(Context)
  // const [deliveryCharges, setDeliveryCharges] = useState(0)
  // const [discountRate, setDiscountRate] = useState(5)  //in percentage
  const [showInputBox, setShowInputBox] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const inputRef = useRef(null);


  const navigate = useNavigate();

  const discountAmount = discountRate * totalAmount / 100;
  const grandTotal = totalAmount + platformFee - discountAmount + deliveryCharges;

  const handleButtonClick = () => {
    setButtonClicked(true);
    setShowInputBox(false);
    const coupon = coupon_list.find(coupon => coupon.code === couponCode.toUpperCase());
    coupon ? setDiscountRate(coupon.discount) : setDiscountRate(0);
    };
    
  useEffect(() => {
    // console.log(inputRef.current);
    if (showInputBox && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInputBox]);

  useScrollToTop();
  
  
  return (
    <div className='px-4 xs:px-8 sm:px-12 md:px-16 lg:px-14 xl:px-32 mt-32 w-full'>
      

      {/* Items List */}
      <div className='border bg-neutral-100 py-8 lg:py-16 xs:px-8 sm:px-16 lg:px-20'>

        {/* Cart Header */}
        <div className='flex justify-between sm:items-center text-2xl mb-16'>
          <p className='text-2xl xs:text-4xl lg:text-5xl uppercase font-semibold'>My Cart</p>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='flex items-center mb-1 md:mb-0'>
              <img src={assets.location_icon} alt="location" width={20}
              className='inline-block mr-2 w-4 lg:w-5'
              /> 
              <p className='text-xs md:text-[15px] lg:text-base'>Deliver to </p>
            </div>
            <form action="" className='mt-2 sm:mt-0 flex items-center gap-2'>
              <input type="text" placeholder='Enter Pincode'
              className='mx-1.5 lg:mx-3 text-xs md:text-[15px] lg:text-base w-24 sm:w-32 lg:w-36 px-2 py-1 border rounded-md'
              />
              <button className='bg-carrot/85 hover:bg-carrot duration-300 text-white px-4 py-1 rounded-xl text-xs md:text-[15px] lg:text-base font-semibold w-fit'>
                Check
              </button>
            </form>
          </div>          
        </div>

        {/* Fields */}
        {
          Object.keys(cartItems).length === 0 ?
          <>
            <div className='flex justify-center items-center gap-3 lg:gap-6 mt-24'>
              <img src={assets.empty_cart_icon} alt="empty-cart" width={50} className='w-6 md:w-8'/>
              <p className='xs:text-xl md:text-2xl lg:text-3xl font-semibold'>Your cart is empty</p>
            </div>
            <Link to="/"><button className='ml-[37%] sm:ml-[40%] mt-8 text-xs xs:text-sm md:text-[15px] lg:text-xl font-semibold text-white border py-2 px-4 rounded-xl bg-carrot/85 hover:bg-carrot'>Order Now!</button></Link>
          </>   :
          <div className='flex justify-between lg:text-2xl pb-3 pl-[36px] lg:px-4 border-b-2'>
          <p>Item</p>
          <p className='hidden xs:block'>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p className='w-6 xs:w-2'></p>
        </div>
        }
        

        {/* Items */}
        {
          // cartItems.map()
          Object.keys(cartItems).length > 0 &&

          food_list.map((item, index) => {

            

            if (item._id in cartItems) { //cart
              return (
                <div className='relative xs:static flex justify-between items-center text-sm lg:text-[18px] my-4 pb-6 px-5 xs:px-2 md:px-4 border-b-2' key={index}>                
                <p><img src={item.image} alt="item-image" width={80} className='w-10 lg:w-20 ml-4 xs:ml-0'/></p>
                <p className='-ml-3 sm:-ml- lg:-ml-12 absolute xs:static top-9 left-9 text-xs xs:text-sm lg:text-[18px] w-32'>{item.name}</p>
                <p className='xs:-ml-8 md:-ml-12'>{item.price}</p>
                <p className='flex justify-around items-center w-4 xs:w-[4.5rem] lg:w-24 cursor-pointer'>
                  <img src={assets.subtract_icon} alt="subtract"
                  className='hover:opacity-50 duration-300'
                  onClick={() => {
                    removeFromCart(item._id);
                    }} />
                  <span className='bg-white w-8 text-center mx-1.5 sm:mx-2 lg:mx-4'
                  >
                    {cartItems[item._id]}
                  </span>
                  <img src={assets.add_icon} alt="add"
                  className='hover:opacity-50 duration-300'
                  onClick={() => {
                    addToCart(item._id);
                  }} />
                </p>
                <p className='ml-12 -mr-2 xs:ml-0'>{item.price * cartItems[item._id]}</p>
                <p className='cursor-pointer hover:opacity-50 duration-300'
                onClick={() => deleteFromCart(item._id)}
                ><img src={assets.close_icon} alt="remove" width={20} className='w-4 lg:w-5'/></p>
                </div>
              )
            }
          })
        }

        {/* Clear Cart and Back to Menu*/}
        {
          Object.keys(cartItems).length > 0 &&

          <div className='flex justify-between mt-14 px-5 xs:px-0'>
            <Link to="/"><button
            className='text-sm md-text-base lg:text-xl font-semibold text-white border py-2 px-4 rounded-xl bg-carrot/85 hover:bg-carrot'
            >Back To Menu</button></Link>
            <button
            onClick={() => clearCart()}
            className='text-sm md-text-base lg:text-xl font-semibold text-white border py-2 px-4 rounded-xl bg-carrot/85 hover:bg-carrot'>Clear All</button>
          </div>
        }
      </div>

      {/* Cart Bottom - PromoCode and Bill */}

      {
        Object.keys(cartItems).length > 0 &&
      <div className='flex flex-col md:flex-row justify-between items-center mt-16 md:mt-24'>

        {/* Coupon Code */}
        <div>
            <div className='flex items-center'>

              {/* Coupon Code Area */}
              <div className='my-4 border-2 border-r-0 border-dashed h-fit'
              onFocus={() => setButtonClicked(false)}
              >
                {
                  showInputBox? 
                  <input type='text' className='md:text-xl font-bold py-3.5 px-14 outline-none w-52 xs:w-60 lg:w-[30vw] xl:w-[20vw] uppercase' placeholder=""
                  value={couponCode}
                  ref={inputRef} 
                  onChange={(event) => setCouponCode(event.target.value)} 
                  />
                  :
                  <div className='md:text-xl font-bold py-3.5 md:py-4 outline-none w-52 xs:w-60 lg:w-[30vw] xl:w-[20vw] bg-white uppercase cursor-text'
                  onClick={() => setShowInputBox(true)}
                  >
                    <p className={`${couponCode === "" ? "" : "ml-10"}`}>
                      {
                        couponCode === "" ? <span className='flex items-center justify-left gap-4 px-10 opacity-40 text-xs sm:text-sm md:text-base lg:text-xl'><img src={assets.discount_icon} alt="coupon" className='rounded-full'/>Coupon Code</span> :
                        (discountRate > 0) ? <span className='flex items-center justify-between px-4'>{couponCode}<img src={assets.verified_icon} alt="verified" className='mr-4'/></span> : <span className='ml-4 opacity-40'>{couponCode}</span>
                      }
                    </p>
                  </div>
                }
                
              </div>

              {/* Apply Button */}
              <button
              onClick={handleButtonClick}
              className='bg-carrot/85 hover:bg-carrot duration-300 text-white px-4 py-4 lg:text-xl font-semibold'>Apply</button>
            </div>
            {/* Error Messages */}
            <div className='h-5 w-full'>

            {
              buttonClicked && couponCode === "" ? 
              <p className='ml-12 text-[15px] text-dark-carrot'>Enter a Coupon Code!</p> :
              <></>
            }
            {
              !showInputBox && couponCode && (discountRate > 0? "" : 
              <p className='ml-12 text-[15px] text-dark-carrot'>Invalid Coupon!</p> )
            }
            </div>

        </div>

        {/* Bill Summary */}
        
        <div className='border py-4 px-6 lg:px-10 rounded-lg text-center bg-neutral-100 mt-12 md:mt-0'>
          <p className='text-xl lg:text-2xl pb-4 mb-4 lg:mb-8 border-b-2 border-neutral-300 text-center uppercase font-semibold'>Order Summary</p>
          <div className='*:gap-20 xs:*:gap-28 md:*:gap-20 lg:*:gap-24 *:my-2 lg:*:my-3 lg:text-xl'>
            <div className='flex justify-between items-center'>
              <p>Subtotal</p>              
              <p className='font-semibold'>&#8377;{ totalAmount }.00</p>
            </div>           
            <div className='flex justify-between items-center'>
              <p>Discount</p>
              <p className='font-semibold'>-&#8377;{discountAmount}{discountAmount % 1 === 0? ".00" : discountAmount*10 % 1 === 0? "0" : ""}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p>Delivery Charges</p>
              <p className='font-semibold'>{deliveryCharges ===  0? "Free" : <>&#8377;{deliveryCharges}.00</>}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p>Platform Fee</p>
              <p className='font-semibold'>&#8377;{platformFee}{platformFee % 1 === 0? ".00" : platformFee*10 % 1 === 0? "0" : ""}</p>
            </div>
            <div className='flex justify-between items-center border-t-2 border-neutral-300 mt-4 pt-2'>
              <p>Total</p>
              <p className='font-semibold'>&#8377;{grandTotal}{grandTotal % 1 === 0? ".00" : grandTotal*10 % 1 === 0? "0" : ""}</p>
            </div> 
          </div>
          <button className='bg-carrot/85 hover:bg-carrot duration-300 text-white mt-3 lg:mt-6 px-6 py-2 rounded-xl lg:text-xl font-semibold'
            onClick={() => navigate("/order")}
          >Proceed To Checkout</button>
        </div>
      </div>
      }
    </div>
  )
}

export default Cart

