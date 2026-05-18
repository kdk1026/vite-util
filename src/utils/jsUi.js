/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.05.18
 * @version 1.0
 * @description Vanilla JS UI 관련 (퍼블에서 잡아주겠지만 혹시 몰라서)
 */

import Swiper from "swiper";

export const UI = {};

/**
 * 
 * @param {object} swiperOptions
 * @returns 
 */
UI.swiperApply = ({swiperId, isAutoplay = true, autopalyDelay, isPagination = true, paginationEl, isNavigation = false, navigationNextEl, navigationPrevEl}) => {
    return new Swiper(swiperId, {
        autoplay: isAutoplay ? { delay: autopalyDelay || 3000 } : false,
        pagination: isPagination ? {
            el: paginationEl || '.swiper-pagination'
        } : false,
        navigation: isNavigation ? {
            nextEl: navigationNextEl || '.swiper-button-next',
            prevEl: navigationPrevEl || '.swiper-button-prev',
        } : false
    });
};