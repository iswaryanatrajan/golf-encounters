import React from 'react';
import { singleEventContextStore } from '../../contexts/eventContext';
import { useTranslation } from "react-i18next";
const EventDetails: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { singleEvent } = singleEventContextStore();
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{t('ABOUT_EVENT')}</h2>
            <div className='relative h-[60vh] bg-cover object-contain relative'
                style={{ backgroundImage: 'url(/img/golfer-hitting.webp)' }}
            >
                <div className='pt-10'>
                <div className='bg-white  px-4 py-2 rounded-lg shadow-lg mx-10 max-w-3xl xl:mx-auto  '>
                    <h2 className='text-center leading-[27px] xl:leading-[32px] text-blue font-semibold  md:text-sm text-lg  xl:text-3xl'>{t('EVENT_BELOW')}</h2>
                </div>
                </div>
                
             
            </div>
            <div className='relative w-full  flex justify-center xl:max-w-5xl mx-auto '>
                    <div className="bg-[#17B3A6] rounded-lg shadow-lg xl:absolute top-[-80px] w-full ">
                        <div className='xl:flex justify-around gap-20'>
                            <div className="xl:flex gap-10 items-center bg-primary-green p-4">
                                <img
                                    src={singleEvent?.imageUrl?.map((item: any) => { item[0] }) ? singleEvent?.imageUrl[0] : "/img/BG-GOLF.jpg"}
                                    alt="Golfer"
                                    className="w-24 h-24 rounded-full object-cover mx-3"
                                />
                                <div className="text-white">
                                    <h3 className="text-xl font-semibold text-[#17B3A6] bg-white p-1 rounded-md px-4">{singleEvent?.eventType || t('EVENT_DETAILS')} </h3>
                                    <p className="text-base">{singleEvent?.eventName || t('ZOZO_CHAMPIONSHIP')}</p>
                                </div>
                            </div>
                            <div className="flex  items-center p-4 bg-primary-teal text-white">
                                <div>
                                    <span className='bg-white rounded-full text-center h-8 w-8 flex items-center justify-center mt-5 mx-2 p-2'>
                                        <svg width="16" height="24" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5662 4.7817C10.4315 4.7817 8.49841 5.63605 7.09962 7.02114C5.70228 8.40305 4.83578 10.311 4.83578 12.4183C4.83578 14.527 5.70067 16.4365 7.09962 17.8183C8.49857 19.2002 10.4316 20.0545 12.5662 20.0545C14.6816 20.0545 16.6001 19.213 17.996 17.8518L18.0331 17.8183C19.4321 16.4364 20.297 14.5269 20.297 12.4183C20.297 10.3112 19.4305 8.40328 18.0299 7.01831C16.631 5.638 14.6995 4.7817 12.5662 4.7817ZM15.5303 32.6035C16.0451 32.7565 16.5017 32.9494 16.8809 33.1709C17.7151 33.6586 18.2088 34.309 18.2088 35.0517C18.2088 35.9332 17.5069 36.6871 16.3726 37.1923C15.3867 37.6322 14.0394 37.9032 12.5662 37.9032C11.093 37.9032 9.7441 37.6323 8.75984 37.1923C7.6255 36.6871 6.92361 35.9332 6.92361 35.0517C6.92361 34.309 7.41897 33.6586 8.25155 33.1709C8.63074 32.9493 9.08736 32.7565 9.60209 32.6035L10.2717 33.6873C9.72312 33.8228 9.24871 34.0061 8.88083 34.2229C8.42901 34.4875 8.16279 34.7776 8.16279 35.0533C8.16279 35.4088 8.58713 35.7769 9.26969 36.0798C10.1007 36.4512 11.2673 36.6807 12.5678 36.6807C13.8683 36.6807 15.035 36.4512 15.8659 36.0798C16.5485 35.7769 16.9729 35.4088 16.9729 35.0533C16.9729 34.7776 16.7034 34.4875 16.2548 34.2229C15.8853 34.0061 15.4109 33.8244 14.8623 33.6873L15.5319 32.6035H15.5303ZM1.83784 18.8831C1.24566 17.9252 0.779341 16.8828 0.467927 15.7782C0.162965 14.7055 0 13.5786 0 12.4167C0 8.99136 1.407 5.88638 3.68377 3.6389C5.95727 1.3915 9.09872 0 12.5698 0C16.0389 0 19.1839 1.38987 21.4574 3.63572L21.4913 3.67238C23.7454 5.9166 25.1395 9.00546 25.1395 12.415C25.1395 13.5754 24.9766 14.7039 24.6716 15.7766C24.3586 16.8812 23.8939 17.9236 23.3017 18.8815L13.0992 35.3688C12.9218 35.6557 12.5409 35.7465 12.2505 35.5712C12.1618 35.517 12.0892 35.4437 12.0391 35.3608L1.84123 18.8813L1.83784 18.8831Z" fill="#17B3A6" />
                                        </svg>

                                    </span>
                                    <span className='bg-white rounded-full text-center h-8 w-8 flex items-center justify-center mt-5 mx-2 p-2'>
                                        <svg width="24" height="24" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M30.1975 3.75378H28.6249V5.63067C28.6249 7.18276 27.3554 8.44601 25.7942 8.44601C24.2331 8.44601 22.9628 7.18314 22.9628 5.63067V3.75378H19.8173V5.63067C19.8173 7.18276 18.5474 8.44601 16.9863 8.44601C15.4255 8.44601 14.1552 7.18314 14.1552 5.63067V3.75378H11.0098V5.63067C11.0098 7.18276 9.73946 8.44601 8.17871 8.44601C6.61796 8.44601 5.34804 7.18314 5.34804 5.63067V3.75378H3.77511C1.69322 3.75378 0 5.43723 0 7.50756V30.3168C0 32.3868 1.69322 34.0702 3.77511 34.0702H30.1975C32.279 34.0702 33.973 32.3868 33.973 30.3168V7.50756C33.973 5.43761 32.279 3.75378 30.1975 3.75378ZM31.456 30.3168C31.456 31.0062 30.8918 31.5679 30.1975 31.5679H3.77511C3.08153 31.5679 2.51699 31.0065 2.51699 30.3168V12.5121C2.51699 11.8212 3.08039 11.261 3.77511 11.261H30.1975C30.8926 11.261 31.456 11.8208 31.456 12.5121V30.3168Z" fill="#17B3A6" />
                                            <path d="M8.17911 7.50756C9.22177 7.50756 10.0665 6.66716 10.0665 5.63067V1.87689C10.0665 0.840398 9.22139 0 8.17911 0C7.13684 0 6.29175 0.840398 6.29175 1.87689V5.63067C6.29175 6.66716 7.13684 7.50756 8.17911 7.50756Z" fill="#17B3A6" />
                                            <path d="M16.9867 7.50756C18.029 7.50756 18.8733 6.66716 18.8733 5.63067V1.87689C18.8733 0.840398 18.029 0 16.9867 0C15.9441 0 15.0994 0.840398 15.0994 1.87689V5.63067C15.0997 6.66716 15.9441 7.50756 16.9867 7.50756Z" fill="#17B3A6" />
                                            <path d="M25.7935 7.50756C26.8358 7.50756 27.6812 6.66716 27.6812 5.63067V1.87689C27.6812 0.840398 26.8358 0 25.7935 0C24.7512 0 23.9065 0.840398 23.9065 1.87689V5.63067C23.9065 6.66716 24.7512 7.50756 25.7935 7.50756Z" fill="#17B3A6" />
                                            <path d="M8.66323 13.8961H6.55698C5.97531 13.8961 5.50366 14.3651 5.50366 14.9436V17.0381C5.50366 17.6162 5.97531 18.0856 6.55698 18.0856H8.66323C9.24489 18.0856 9.71654 17.6166 9.71654 17.0381V14.9432C9.71654 14.3647 9.24489 13.8961 8.66323 13.8961Z" fill="#17B3A6" />
                                            <path d="M14.9142 13.8961H12.808C12.2263 13.8961 11.7546 14.3651 11.7546 14.9436V17.0381C11.7546 17.6162 12.2263 18.0856 12.808 18.0856H14.9142C15.4959 18.0856 15.9675 17.6166 15.9675 17.0381V14.9432C15.9671 14.3647 15.4959 13.8961 14.9142 13.8961Z" fill="#17B3A6" />
                                              <path d="M21.1644 13.8961H19.0589C18.4773 13.8961 18.0056 14.3651 18.0056 14.9436V17.0381C18.0056 17.6162 18.4769 18.0856 19.0589 18.0856H21.1644C21.7465 18.0856 22.2181 17.6166 22.2181 17.0381V14.9432C22.2177 14.3647 21.7465 13.8961 21.1644 13.8961Z" fill="#17B3A6" />
                                            <path d="M27.4162 13.8961H25.3099C24.7286 13.8961 24.2566 14.3651 24.2566 14.9436V17.0381C24.2566 17.6162 24.7282 18.0856 25.3099 18.0856H27.4162C27.9978 18.0856 28.4699 17.6166 28.4699 17.0381V14.9432C28.4691 14.3647 27.9978 13.8961 27.4162 13.8961Z" fill="#17B3A6" />
                                            <path d="M8.66323 19.3201H6.55698C5.97531 19.3201 5.50366 19.7891 5.50366 20.3679V22.4621C5.50366 23.0402 5.97531 23.5096 6.55698 23.5096H8.66323C9.24489 23.5096 9.71654 23.0405 9.71654 22.4621V20.3679C9.71654 19.7887 9.24489 19.3201 8.66323 19.3201Z" fill="#17B3A6" />
                                            <path d="M14.9142 19.3201H12.808C12.2263 19.3201 11.7546 19.7891 11.7546 20.3679V22.4621C11.7546 23.0402 12.2263 23.5096 12.808 23.5096H14.9142C15.4959 23.5096 15.9675 23.0405 15.9675 22.4621V20.3679C15.9671 19.7887 15.4959 19.3201 14.9142 19.3201Z" fill="#17B3A6" />
                                            <path d="M21.1644 19.3201H19.0589C18.4773 19.3201 18.0056 19.7891 18.0056 20.3679V22.4621C18.0056 23.0402 18.4769 23.5096 19.0589 23.5096H21.1644C21.7465 23.5096 22.2181 23.0405 22.2181 22.4621V20.3679C22.2177 19.7887 21.7465 19.3201 21.1644 19.3201Z" fill="#17B3A6" />
                                            <path d="M27.4162 19.3201H25.3099C24.7286 19.3201 24.2566 19.7891 24.2566 20.3679V22.4621C24.2566 23.0402 24.7282 23.5096 25.3099 23.5096H27.4162C27.9978 23.5096 28.4699 23.0405 28.4699 22.4621V20.3679C28.4691 19.7887 27.9978 19.3201 27.4162 19.3201Z" fill="#17B3A6" />
                                            <path d="M8.66323 24.7437H6.55698C5.97531 24.7437 5.50366 25.2127 5.50366 25.7911V27.8853C5.50366 28.4641 5.97531 28.9332 6.55698 28.9332H8.66323C9.24489 28.9332 9.71654 28.4645 9.71654 27.8853V25.7911C9.71654 25.2131 9.24489 24.7437 8.66323 24.7437Z" fill="#17B3A6" />
                                            <path d="M14.9142 24.7437H12.808C12.2263 24.7437 11.7546 25.2127 11.7546 25.7911V27.8853C11.7546 28.4641 12.2263 28.9332 12.808 28.9332H14.9142C15.4959 28.9332 15.9675 28.4645 15.9675 27.8853V25.7911C15.9671 25.2131 15.4959 24.7437 14.9142 24.7437Z" fill="#17B3A6" />
                                            <path d="M21.1644 24.7437H19.0589C18.4773 24.7437 18.0056 25.2127 18.0056 25.7911V27.8853C18.0056 28.4641 18.4769 28.9332 19.0589 28.9332H21.1644C21.7465 28.9332 22.2181 28.4645 22.2181 27.8853V25.7911C22.2177 25.2131 21.7465 24.7437 21.1644 24.7437Z" fill="#17B3A6" />
                                        </svg>
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div>
                                        <div>
                                            <h4 className="text-lg">{singleEvent?.place || t('HIROSHIMA_JAPAN')}</h4>
                                            <p className="text-base">{singleEvent?.address || t("NO_ADDRESS")}</p>
                                        </div>

                                        <div className="flex items-center">


                                            <p className="text-base">{singleEvent?.eventStartDate}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
        </div>
    );
};

export default EventDetails;

