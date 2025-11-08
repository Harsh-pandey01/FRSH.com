import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import PaymentCardDetails from "../components/CardDetails";
import { AnimatePresence, motion } from "motion/react";
import { updateAdminOrders } from "../firebase/db";

function CheckoutPage() {
  const { cartData } = useSelector((state) => state.cartdata);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [isCardPaymentOpen, setIsCardPaymentOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const { allProducts } = useSelector((state) => state.productsData);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handlePaymentChange = (e) => {
    const selected = e.target.value;
    setModeOfPayment(selected);
    setIsCardPaymentOpen(selected === "card");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // FORM VALIDATION LOGIC
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!modeOfPayment)
      newErrors.modeOfPayment = "Please select a payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetAdminInfoForOrdering = () => {
    const cartProductsIds = cartData.map((item) => item.productId);
    const orderInfo = allProducts
      .filter((item) => {
        return cartProductsIds.includes(item.id);
      })
      .map((item) => {
        console.log(item);
        return {
          adminID: item.adminId,
          productId: item.productId,
          userData: formData,
          orderStatus: "Placed",
          orderID: crypto.randomUUID(),
          productInfo: cartData.filter(
            (items) => item.productId == items.productId
          ),
        };
      });
    return orderInfo;
  };

  const handleSubmit = async (e) => {
    if (validateForm()) {
      const ordersToPush = handleGetAdminInfoForOrdering();
      await updateAdminOrders(ordersToPush);
      alert("🎉 Order placed successfully!");
    }
  };

  const subtotal = cartData.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  return (
    <div className="w-full px-5 py-5">
      <div className="flex items-center gap-10">
        <button
          onClick={() => history.back()}
          className="border border-border px-5 py-1 rounded-sm cursor-pointer group"
        >
          <IoIosArrowRoundBack className="group-hover:-translate-x-2 duration-150 ease-in-out transition-all" />
        </button>
        <h1 className="font-syne font-bold text-2xl">CHECKOUT</h1>
      </div>

      <div className="mt-5 w-full grid lg:grid-cols-[2fr_1fr] gap-15">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col gap-5"
        >
          {/* USER INFORMATION */}
          <div className="border border-border">
            <div className="py-2.5 px-2 border-b border-border">
              <h1 className="font-semibold font-syne">USER INFORMATION</h1>
            </div>
            <div className="px-2.5 py-2.5">
              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-2 mt-2 gap-5">
                  {["firstName", "lastName"].map((field) => (
                    <div
                      key={field}
                      className="flex flex-col font-inter text-xs gap-1.5"
                    >
                      <label htmlFor={field} className="pl-2 capitalize">
                        {field.replace("Name", " Name")}
                      </label>
                      <input
                        autoComplete="off"
                        className="w-full px-2 py-2.5 border border-border text-text"
                        type="text"
                        id={field}
                        name={field}
                        placeholder={
                          field === "firstName" ? "First Name" : "Last Name"
                        }
                        value={formData[field]}
                        onChange={handleChange}
                      />
                      <AnimatePresence>
                        {errors[field] && (
                          <motion.p
                            className="text-xs text-red-500"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                          >
                            {errors[field]}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 mt-2 gap-5">
                  {/* Email */}
                  <div className="flex flex-col font-inter text-xs gap-1.5">
                    <label htmlFor="email" className="pl-2">
                      Email
                    </label>
                    <input
                      autoComplete="off"
                      className="w-full px-2 py-2.5 border border-border text-text"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="User Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          className="text-xs text-red-500"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col font-inter text-xs gap-1.5">
                    <label htmlFor="phone" className="pl-2">
                      Contact Number
                    </label>
                    <div className="flex items-center gap-2 border border-border px-2">
                      <p>+91</p>
                      <input
                        autoComplete="off"
                        className="w-full px-2 outline-none py-2.5"
                        type="number"
                        id="phone"
                        name="phone"
                        placeholder="Contact Number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p
                          className="text-xs text-red-500"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADDRESS INFORMATION */}
          <div className="border border-border">
            <div className="py-2.5 px-2 border-b border-border">
              <h1 className="font-semibold font-syne">ADDRESS INFORMATION</h1>
            </div>
            <div className="px-2.5 py-2.5">
              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-1 mt-2 gap-5">
                  <div className="flex flex-col font-inter text-xs gap-1.5">
                    <label htmlFor="streetAddress" className="pl-2">
                      Full Address
                    </label>
                    <input
                      autoComplete="off"
                      className="w-full px-2 py-2.5 border border-border text-text"
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      placeholder="House number and full address"
                      value={formData.streetAddress}
                      onChange={handleChange}
                    />
                    <AnimatePresence>
                      {errors.streetAddress && (
                        <motion.p
                          className="text-xs text-red-500"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          {errors.streetAddress}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-3 mt-2 gap-5">
                  {["city", "pincode", "state"].map((field) => (
                    <div
                      key={field}
                      className="flex flex-col font-inter text-xs gap-1.5"
                    >
                      <label htmlFor={field} className="pl-2 capitalize">
                        {field}
                      </label>
                      <input
                        autoComplete="off"
                        className="w-full px-2 py-2.5 border border-border text-text"
                        type={field === "pincode" ? "number" : "text"}
                        id={field}
                        name={field}
                        placeholder={`Enter ${field}`}
                        value={formData[field]}
                        onChange={handleChange}
                      />
                      <AnimatePresence>
                        {errors[field] && (
                          <motion.p
                            className="text-xs text-red-500"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                          >
                            {errors[field]}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="border border-border">
            <div className="py-2.5 px-2 border-b border-border">
              <h1 className="font-semibold font-syne">
                PAYMENT METHOD{" "}
                <span className="text-text/50 text-xs">
                  (Don't fill the correct Card Details)
                </span>
              </h1>
            </div>
            <div className="px-2.5 py-2.5 font-inter text-sm">
              <div className="flex items-center gap-2.5">
                <input
                  autoComplete="off"
                  type="radio"
                  value="cash"
                  name="modeOfPayment"
                  id="cash"
                  checked={modeOfPayment === "cash"}
                  onChange={handlePaymentChange}
                  className="cursor-pointer"
                />
                <label htmlFor="cash" className="cursor-pointer">
                  Cash On Delivery
                </label>
              </div>

              <div className="flex items-center gap-2.5 mt-2.5">
                <input
                  autoComplete="off"
                  type="radio"
                  value="card"
                  name="modeOfPayment"
                  id="card"
                  checked={modeOfPayment === "card"}
                  onChange={handlePaymentChange}
                  className="cursor-pointer"
                />
                <label htmlFor="card" className="cursor-pointer">
                  Pay Using Card
                </label>
              </div>

              <AnimatePresence>
                {errors.modeOfPayment && (
                  <motion.p
                    className="text-xs text-red-500 mt-2"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {errors.modeOfPayment}
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isCardPaymentOpen && (
                  <motion.div
                    key="card-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-3 border-t border-border pt-3 overflow-hidden"
                  >
                    <PaymentCardDetails />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>

        {/* ORDER SUMMARY */}
        <div className="border border-border h-fit px-2.5 py-2.5 bg-secondry">
          <h1 className="font-syne font-semibold text-end border-b border-border pb-2.5">
            Order Summary
          </h1>
          <div className="flex flex-col gap-2 py-2 border-b border-border">
            {cartData.map((item) => (
              <div key={item.productId} className="flex gap-2">
                <div className="h-15 w-15 rounded-md overflow-clip">
                  <img
                    className="w-full h-full object-cover object-top"
                    src={item.banner}
                    alt="product-img"
                  />
                </div>
                <div className="font-inter flex-1 tracking-tight">
                  {item.title.length < 40
                    ? item.title
                    : item.title.slice(0, 40) + " ..."}
                  <p className="text-xs text-text/80 font-robo">
                    Quantity : {item.quantity}
                  </p>
                </div>
                <button className="px-2.5 hover:text-red-500 cursor-pointer text-xl">
                  <MdOutlineDelete />
                </button>
              </div>
            ))}
          </div>
          <p className="py-1.5 text-end font-semibold font-inter">
            Total : ₹ {subtotal}
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2.5 text-white cursor-pointer bg-bluish w-full rounded mt-5"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
