import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import NameFilter from "./filters/NameFilter";
import { teacherContext } from "../contexts/teachersContext";
import { Link } from "react-router-dom";
import { userAuthContext } from "../contexts/authContext";
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_TEST_SECRET_KEY);

// function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(' ')
// }

export default function TeacherListHeader() {
  const teacherId  = localStorage.getItem("teacher_id");
  const {
    handleNameSearch,teacherFee
  } = teacherContext();
  const { t } = useTranslation();
  const handleNameChange = (e: any) => {
    handleNameSearch(e.target.value);
  };
  const { user } = userAuthContext();
  
  const handleCheckout = async (e: any) => {

    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (token) {


        const lineItems = [
          {
            price_data: {
              currency: "JPY",
              product_data: {
                name: "アカウント作成手数料",
              },
              unit_amount: teacherFee,
            },
            quantity: 1,
          }
        ];
        var baseUrl = window.location.origin;
        var createEvent = baseUrl + '/teacher-page';
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

 

  };
 
  return (
    <>
      <div>
        <div  className="flex justify-center xl:justify-end my-4">
          {!teacherId  &&  (
            <Link
             to=""
             
            >
              <button className="flex cursor-pointer items-center justify-center gap-2 bg-[#17b3a6] hover:bg-blue-700 text-white font-bold py-4 px-4 rounded" onClick={handleCheckout}>
                {t("BECOME_TEACHER")}
              </button>
            </Link>
          )}
        </div>
        <div className="py-4  md:flex justify-between items-center mx-2">
          <h3 className="block text-xl font-bold leading-6 text-gray-900 text-start">
            {t("FIND_TEACHER")}
          </h3>
          <div>
            <NameFilter handleNameChange={handleNameChange} />
          </div>
        </div>
      </div>
    </>
  );
}
