/**
 * 
 * @returns 
 */
export const isMobile = () => {
    const _filter = 'windows|macos|win16|win32|win64|macintel';
    const _platform = navigator.userAgentData?.platform || navigator?.platform;

    if( _filter.indexOf(_platform.toLowerCase()) < 0 ) {
        return true;
    } else {
        return false;
    }
};

/**
 * 
 * @returns 
 */
export const isUserAgentMobile = () => {
    const userAgent = navigator.userAgent || window.opera;
    
    if (/android/i.test(userAgent)) {
        return true;
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
    }

    if (/blackberry|bb10|playbook/i.test(userAgent)) {
        return true;
    }

    if (/windows phone/i.test(userAgent)) {
        return true;
    }

    if (/webos|touchpad|hpwos/i.test(userAgent)) {
        return true;
    }

    return false;
}

/**
 * 
 * @returns 
 */
export const isMobileOs = () => {
    const _ret = {
        Android: navigator.userAgent.match(/Android/i) == null ? false : true,
        iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true
    };
    return _ret;
};

/**
 * 
 * @param {string} checkString 
 * @returns 
 */
export const isCheckUserAgent = (checkString) => {
    const _agent = navigator.userAgent;
    return _agent.indexOf(checkString) > -1;
};

/**
 * 
 * 링크 생성 하더라도 작동하려면 다음 설정 필수
 * AndroidManifest.xml
 *  <intent-filter>
 *      <action android:name="android.intent.action.VIEW" />
 *      <category android:name="android.intent.category.DEFAULT" />
 *      <category android:name="android.intent.category.BROWSABLE" />
 *      <data android:host="호스트" android:scheme="스키마" />
 *  </intent-filter>
 * @param {string} host 
 * @param {string} scheme 
 * @param {string} packageName 
 * @param {undefined|screen} screen
 * @returns 
 */
export const makeAndroidAppLinkUrl = (host, scheme, packageName, screen) => {
    if ( !screen  ) {
        return 'intent://' + host + '/#Intent;package=' + packageName + ';scheme=' + scheme + ';end';
    } else {
        return 'intent://' + host + '/#Intent;package=' + packageName + ';scheme=' + scheme + ';S.screen=' + screen + ';end';
    }
};

/**
 * URL 스킴 방식
 * 1. info.plist 에 URL Types 항목 추가
 * 2. Identifier와 URL Schemes에 적절한 값을 입력
 * @param {string} host 
 * @param {string} scheme 
 * @param {undefined|screen} screen
 * @returns 
 */
export const makeURLSchemeIOSAppLinkUrl = (host, scheme, screen) => {
    if ( !screen ) {
        return scheme + '://' + host;
    } else {
        return scheme + '://' + host + '?screen=' + screen;
    }
};

/**
 * 
 * @param {string} androidUrl 
 * @param {string} iosUrl 
 * @param {string} iosAppStoreUrl 
 */
export const runAppLinkUrl = (androidUrl, iosUrl, iosAppStoreUrl) => {
    if ( isMobile() ) {
        const mobileOs = isMobileOs();

        if ( mobileOs.Android ) {
            // 안드로이드는 설치되어 있지 않으면 자동으로 마켓으로 이동
            location.href = androidUrl;
        }

        if ( mobileOs.iOS ) {
            // 1초 이후 반응이 없으면 앱스토어로 이동
            setTimeout(function () {
                window.open(iosAppStoreUrl);
            }, 1000);

            location.href = iosUrl;
        }
    } else {
        console.log('모바일 플랫폼에서만 사용 가능합니다.');
    }
};
