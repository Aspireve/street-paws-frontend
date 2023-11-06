import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Veterinary from '../../assets/poster1-pic.jpg'
import Community from '../../assets/poster2-pic.jpg'
import ChatBot from '../../assets/poster3-pic.jpg'

import 'swiper/css';
import "swiper/css/effect-cards";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCards, Pagination } from 'swiper';
import { Link } from 'react-router-dom';

const Cards = () => {

    return (
        <div className='w-screen max-w-full overflow-hidden max-h-full h-2/3'>
            <Swiper
                effect={"cards"}
                grabCursor={true}
                pagination={{
                    dynamicBullets: true,
                }}
                loop={true}
                slidesPerView={'auto'}
                modules={[EffectCards, Pagination]}
                className="swiper_container max-h-full"
            >
                <SwiperSlide className='bg-white border h-full'>
                    <div className="rounded h-full shadow-lg dark:shadow-gray-800 " >
                        <img
                            className="h-1/2 w-full"
                            src={Community}
                            alt="Mountain" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Community</div>
                            <p className="text-gray-700 dark:text-gray-300 text-base">
                                Join our community and make a difference for stray animals in your area.
                            </p>
                            <Link to={"/community"}> <button className='px-3 rounded-xl h-8 bg-[#61b3ff] border-[#61b3ff] border-[2px] hover:bg-white transition-all font-semibold text-sm'>Get involved</button></Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='bg-white border h-full'> <div className="rounded h-full shadow-lg dark:shadow-gray-800">
                    <img
                        className="h-1/2 w-full"
                        src={ChatBot}
                        alt="Mountain" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Report</div>
                        <p className="text-gray-700 dark:text-gray-300 text-base">
                            Report an animal you think might be sick, and we'll do the rest
                        </p>
                        <Link to={"/report"}><button className='px-3 rounded-xl h-8 bg-[#61b3ff] border-[#61b3ff] border-[2px] hover:bg-white transition-all font-semibold text-sm'>Find a vet</button></Link>
                    </div>
                </div>
                </SwiperSlide>
                <SwiperSlide className='bg-white border h-full'> <div className="rounded h-full shadow-lg dark:shadow-gray-800">
                    <img
                        className="h-1/2 w-full"
                        src={Veterinary}
                        alt="Mountain" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Veterinary</div>
                        <p className="text-gray-700 dark:text-gray-300 text-base">
                            Find nearby veterinary clinics and give stray animals the care they deserve.
                        </p>
                        <Link to="/"><button className='px-3 rounded-xl h-8 bg-[#61b3ff] border-[#61b3ff] border-[2px] hover:bg-white transition-all font-semibold text-sm'>Chat Now</button></Link>
                    </div>
                </div>
                </SwiperSlide>

            </Swiper>
        </div>
    )
}

export default Cards
