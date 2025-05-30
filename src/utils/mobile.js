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
    if ( !checkString || !checkString.trim() ) {
        console.error('checkString is required.');
        return false;
    } else if (typeof checkString !== 'string') {
        console.error('checkString must be a string.');
        return false;
    }

    const _agent = navigator.userAgent;
    return _agent.indexOf(checkString) > -1;
};

/**
 * INTENT 방식 (Intent URI)
 * 
 * 이 링크가 작동하려면 다음 설정이 필수입니다.
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
    if ( !host || !scheme || !packageName ) {
        console.error('host, scheme, packageName are required.');
        return '';
    }

    if ( !screen  ) {
        return 'intent://' + host + '/#Intent;package=' + packageName + ';scheme=' + scheme + ';end';
    } else {
        return 'intent://' + host + '/#Intent;package=' + packageName + ';scheme=' + scheme + ';S.screen=' + screen + ';end';
    }
};

/**
 * URL 스킴 방식
 * 
 * 이 링크가 작동하려면 다음 설정이 필수입니다.
 * 1. Xcode 프로젝트에서 'Info' 탭을 엽니다.
 * 2. 'URL Types' 섹션으로 스크롤하여 새 항목을 추가합니다 ( '+' 버튼 클릭).
 * 3. 'Identifier' 필드에 고유한 식별자를 입력합니다 (예: 'com.yourcompany.yourapp').
 * 4. 'URL Schemes' 필드에 사용할 스키마를 입력합니다 (예: 'your-app-scheme').
 * 여기에 입력된 스키마가 makeURLSchemeIOSAppLinkUrl 함수의 'scheme' 매개변수와 일치해야 합니다.
 * @param {string} host 
 * @param {string} scheme 
 * @param {undefined|screen} screen
 * @returns 
 */
export const makeURLSchemeIOSAppLinkUrl = (host, scheme, screen) => {
    if ( !host || !scheme ) {
        console.error('host, scheme are required.');
        return '';
    }

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
    if ( !androidUrl || !iosUrl || !iosAppStoreUrl ) {
        console.error('androidUrl, iosUrl, iosAppStoreUrl are required.');
        return;
    }

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
