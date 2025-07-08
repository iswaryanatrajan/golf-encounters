import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userAuthContext } from "../contexts/authContext";
import { API_ENDPOINTS } from "../appConfig";
import { eventContextStore } from "../contexts/eventContext";
import { useTranslation } from "react-i18next";
import { add } from "date-fns";
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_TEST_SECRET_KEY);

const CompleteProfile = () => {
    const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [name, setName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [idImage, setIdImage] = useState<File | null>(null);
    const { handleLocationFilter, clearFilter, eventFee} = eventContextStore();
  const router = useNavigate();

    async function getTotalAmountPaid(customerId: any) {
    try {
 

      const customers = await stripe.customers.list({
        limit: 30,
      });

  
      const totalAmountPaid = customers.data.find((data: any) => "dero@gmail.com" === data.email);

      console.log(totalAmountPaid, "totalAmountPaid")
    
      const payments = await stripe.paymentIntents.list({
        customer: customerId,
      });
      console.log(payments, "payments")

      
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        limit: 100,
      });

    
      const sessionIds = [
        ...payments.data.map((payment: any) => payment.metadata.session_id),
        ...subscriptions.data.map((subscription: any) => subscription.metadata.session_id),
      ];

      return sessionIds;
    } catch (error) {
      console.error('Error retrieving payment history:', error);
      throw error;
    }
  }

  getTotalAmountPaid("cus_Q3C3Vf8MFTWURN")
    .then(totalAmountPaid => {
      console.log('Total amount paid:', totalAmountPaid);
    })
    .catch(error => {
      console.error('Error:', error);
    });
      const { user } = userAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    try {
      // 1. Update address
      const response = await axios.put(
        API_ENDPOINTS.UPDATEUSERPROFILE + userId,
        {name,phoneNumber,address},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        if (response.status !== 200) {
            throw new Error("Failed to update address");
        }
      // 2. Upload ID image
      if (idImage) {
        const formData = new FormData();
        formData.append("image", idImage);

        await axios.put(API_ENDPOINTS.EDITUSERIDPROOF + userId, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        });
      }

      alert("Profile completed!");
      try{
              if (token) {


        const lineItems = [
          {
            price_data: {
              currency: "JPY",
              product_data: {
                name: "Per Event",
              },
              unit_amount: eventFee,
            },
            quantity: 1,
          }
        ];
        var baseUrl = window.location.origin;
        var createEvent = baseUrl + '/create-event';
        const customer = await stripe.customers.create({
          name: user.id,
          email: user.email,
        });

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          customer_email: user.email,

          success_url: `${createEvent}/{CHECKOUT_SESSION_ID}`,
          cancel_url: baseUrl,
          allow_promotion_codes: true,

        });

        window.location.href = session.url;
      } else {
        window.location.href = '/login-page';
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
      
     // router("/create-event"); // ✅ back to event creation
    } catch (err) {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto  p-4 border rounded">
      <h2 className="text-lg font-bold mb-4 mt-5">Complete Your Profile</h2>

     
      <label className="block mb-2 ">{t('FULL_NAME')}</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-4 rounded-md"
        required
      />

    

      <label className="block mb-2"> {t('ADDRESS')}</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 mb-4 rounded-md"
        required
      />

        <label className="block mb-2">{t('PHONE_NUM')}</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full border p-2 mb-4 rounded-md"
        required
      />

      <label className="block mb-2">Identification Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setIdImage(e.target.files?.[0] || null)}
        className="w-full mb-4"
        required
      />

      <button
        type="submit"
        className="bg-blue-600  text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default CompleteProfile;