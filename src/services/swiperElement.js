let registration = null;

export function registerSwiperElement() {
  registration ??= import('swiper/element/bundle').then(({ register }) => register());
  return registration;
}
