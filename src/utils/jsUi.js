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
 ** @param {object} options
 * @param {string} options.swiperId
 * @param {boolean} options.isAutoplay
 * @param {number} options.autoplayDelay
 * @param {boolean} options.isPagination
 * @param {string} options.paginationEl - class 선택자
 * @param {string} options.paginationType - bullets', 'progressbar', 'fraction'
 * @param {boolean} options.isNavigation
 * @param {string} options.navigationNextEl - class 선택자
 * @param {string} options.navigationPrevEl - class 선택자
 * @returns 
 */
UI.swiperApply = ({swiperId, isAutoplay = true, autoplayDelay, isPagination = true, paginationEl,
    paginationType, isNavigation = false, navigationNextEl, navigationPrevEl}) => {
    return new Swiper(swiperId, {
        autoplay: isAutoplay ? { delay: autoplayDelay || 3000 } : false,
        pagination: isPagination ? {
            el: paginationEl || '.swiper-pagination',
            type: paginationType || 'bullets'
        } : false,
        navigation: isNavigation ? {
            nextEl: navigationNextEl || '.swiper-button-next',
            prevEl: navigationPrevEl || '.swiper-button-prev',
        } : false
    });
};