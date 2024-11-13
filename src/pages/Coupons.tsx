import React, { useEffect, useState } from "react";
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_TEST_SECRET_KEY);

const Coupons = () => {
  const [formData, setFormData] = useState({
    duration: "repeating",
    duration_in_months: 3,
    percent_off: 25.5,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const coupon = await stripe.coupons.create({
      duration: formData.duration,
      duration_in_months: formData.duration_in_months,
      percent_off: formData.percent_off,
    });
    console.log(coupon, "createdcoupon");
  };
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSessions = async () => {
      const coupons = await stripe.coupons.list({
        limit: 3,
      });
      setCoupons(coupons.data);
      setLoading(false);
    };

    fetchSessions();
  }, []);
  console.log(coupons);

  return (
    <div>
      <h2>Create Coupon</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Duration in Months:
          <input
            type="number"
            name="duration_in_months"
            value={formData.duration_in_months}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Percent Off:
          <input
            type="number"
            step="0.1"
            name="percent_off"
            value={formData.percent_off}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Coupon</button>
      </form>
      {loading ? (
        <p>Loading sessions...</p>
      ) : (
        <ul>
          {coupons.map((session:any) => (
            <li key={session.id}>
              <p> ID: {session.id}</p>
              <p>percent_off {session.percent_off}</p>
              <p>duration_in_months: {session.duration_in_months}</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Coupons;
