import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function CarouselComponent() {
  return (
    <div className="text-center p-4">
        <Swiper
        modules={[Navigation, Pagination]} // Dodajesz moduły
        spaceBetween={20} // Odstęp między slajdami
        slidesPerView={1} // Ile slajdów widocznych naraz
        navigation // Strzałki nawigacyjne
        
        >
        <SwiperSlide>
            <p>halo1</p>
        </SwiperSlide>
        <SwiperSlide>
            <p>halo2</p>
        </SwiperSlide>
        <SwiperSlide>
            <p>halo3</p>
        </SwiperSlide>
        </Swiper>
    </div>
  );
}
