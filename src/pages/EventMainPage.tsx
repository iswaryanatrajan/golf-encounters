import { FunctionComponent, useState, useEffect } from "react";
import SearchEventContainer from "../components/SearchMainEventFilter";
import SideIconMenu from "../components/SideIconMenu";
import { Clip } from "../components/Clip";
import Tabs from "../components/Tabs";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { ToastProvider } from '../utils/ToastProvider';
import { useTranslation } from "react-i18next";
import { eventContextStore } from "../contexts/eventContext";
import { userAuthContext } from "../contexts/authContext";
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_TEST_SECRET_KEY);





const EventMainPage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [events, setEvents] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1280);
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("ALL");
  const { handleLocationFilter, clearFilter, eventFee} = eventContextStore();





  useEffect(() => {
    handleLocationFilter(selectedLocations);
    if (clearFilter) {
      handleLocationFilter([])
    }


  }, [selectedLocations, clearFilter]);

  const handleTabChange = (tab: string) => {
    const lowerTab = tab?.toLowerCase();
    setCurrentTab(lowerTab);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRemoveLocation = (locationToRemove: string) => {
    setSelectedLocations((prevSelectedLocations) =>
      prevSelectedLocations.filter((location) => location !== locationToRemove)
    );
  };

  useEffect(() => {
    if (clearFilter === true) {
      setSelectedLocations([])

    }
  }, [clearFilter]);

 

  const { user } = userAuthContext();

  async function getTotalAmountPaid(customerId: any) {
    try {
 

      const customers = await stripe.customers.list({
        limit: 30,
      });

  
      const totalAmountPaid = customers.data.find((data: any) => "dero@gmail.com" === data.email);

      console.log(totalAmountPaid, "asd")
    
      const payments = await stripe.paymentIntents.list({
        customer: customerId,
      });
      console.log(payments, "aswwd")

      
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

 

  };

  return (
    <ToastProvider iconColor="white" textColor="white">
      <div className="flex flex-col gap-0 overflow-hidden lg:px-10 py-0 mx-0  bg-[white]  transition-colors duration-2000 animate-color-change">
        <div className="flex flex-col lg:flex-row gap-2 py-0 mx-0 columns-2 justify-between columns-1">
        <div className="lg:columns-2xl columns-xl ">
        <SearchEventContainer /></div>
        <div className="p-2">
            <div onClick={handleCheckout}>
              <button
                type="button"
                className="flex items-center  rounded-md bg-blue-500 px-3 py-3 text-xs font-semibold text-white shadow-sm cursor-pointer animate__animated animate__jello animate__repeat-2 hover:bg-blue-600"
                onClick={() => localStorage.removeItem('par')}
              >
                <PencilSquareIcon
                  className="mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                {t('CREATE_EVENTS')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-end gap-3">
            <div className="hidden md:block md:animate__animated md:animate__rotateIn xl:animate__animated xl:animate__rotateIn">
              <img
                className="object-cover w-16 animate-pulse"
                alt=""
                src="/img/rectangle-1248@2x.png"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 my-2 xl:m-0">
              <h1 className="text-[#193A8B] text-xl lg:text-2xl font-semibold animate__animated animate__rubberBand animate__repeat-3">
                {t('EVENTS_IN')}
              </h1>
              {selectedLocations.map((location, index) => (
                <div key={index} className="flex items-center ">
                  <Clip place={location} />
                  <span
                    onClick={() => handleRemoveLocation(location)}
                    data-te-chip-close
                    className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>

                </div>
              ))}
            </div>
          </div>

        </div>

        <Tabs events={events} setEvents={setEvents} selectedCities={setSelectedLocations} setCurrentTabs={handleTabChange}  />

      </div>
    </ToastProvider>
  );
};

export default EventMainPage;
