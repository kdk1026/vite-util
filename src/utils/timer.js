/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.11.04
 * @version 1.0
 * @description 매개변수 3개부터는 RORO 패턴 적용
 */

/**
 * 타이머
 * * @param {object} options
 * @param {number} options.totalSeconds 
 * @param {string} options.lang 
 * @param {function} options.onTick 
 * @param {function} options.onEnd 
 * 
 * @example
 *  timer({
 *      totalSeconds: 1800,
 *      lang: 'ko',
 *      onTick: ({ minutes, seconds, label }) => {
 *          console.log(`남은 시간: ${minutes}${label.min} ${seconds}${label.sec}`);
 *      },
 *      onEnd: () => {
 *          console.log('타이머 종료');
 *      }
 *  });
 */
export const timer = ({totalSeconds, lang, onTick, onEnd} = {}) => {
    if ( typeof totalSeconds !== 'number' ) {
        console.error("totalSeconds is not number");
        return;
    }

    if ( typeof lang !== 'string' ) {
        console.error("lang is not string");
        return;
    }

    if ( typeof onTick !== 'function' ) {
        console.error("onTick is not function");
        return;
    }

    if ( typeof onEnd !== 'function' ) {
        console.error("onEnd is not function");
        return;
    }

    const localeLabels = {
        ko: { min: '분', sec: '초' },
        en: { min: 'min', sec: 'sec' },
        ja: { min: '分', sec: '秒' },
        zh: { min: '分钟', sec: '秒钟' }
    };

    const intervalId = setInterval(() => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // 숫자만 전달하고, 포맷은 외부에서 처리
        if ( typeof onTick === 'function' ) {
            onTick({ minutes, seconds, label: localeLabels[lang] });
        }

        totalSeconds--;

        if ( totalSeconds < 0 ) {
            clearInterval(intervalId);
            if ( typeof onEnd === 'function' ) {
                onEnd();
            }
        }
    }, 1000);
};