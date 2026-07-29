import axios from "axios";

const API = "https://localhost:7069/api/coupons";

export const getCoupons = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const createCoupon = async (coupon) => {
  const response = await axios.post(API, coupon);
  return response.data;
};

export const updateCoupon = async (id, coupon) => {
  const response = await axios.put(` ${API}/ ${id}`, coupon);
  return response.data;
};

export const deleteCoupon = async (id) => {
  const response = await axios.delete(` ${API}/ ${id}`);
  return response.data;
};

// Called from the Cart page when the customer clicks "Apply" on the coupon field.
// orderTotal should be the cart subtotal (before the coupon discount) so the
// backend can check MinOrder / compute the discount correctly.
export const applyCoupon = async (code, orderTotal) => {
  const response = await axios.post(` ${API}/apply`, {
    code,
    orderTotal,
  });
  return response.data;
};