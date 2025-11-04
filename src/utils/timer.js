/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.11.04
 * @version 1.0
 */

/**
 * 타이머
 * - 사용 예시
 *  timer(1800, 'ko',
 *      ({ minutes, seconds, label }) => {
 *          console.log(`남은 시간: ${minutes}${label.min} ${seconds}${label.sec}`);
 *      },
 *      () => {
 *          console.log('타이머 종료');
 *      }
 *  );
 * @param {number} totalSeconds 
 * @param {string} lang 
 * @param {function } onTick 
 * @param {function } onEnd 
 */
export const timer = (totalSeconds, lang, onTick, onEnd) => {
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