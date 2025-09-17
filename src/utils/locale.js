import { decode } from "html-entities";
import DOMPurify from 'dompurify';

/**
 * 세션 스토리지에서 로케일 데이터 가져오기
 * @param {null|blank||string} localeCode 
 * @param {string} defaultString 
 * @returns 
 */
export const getLocaleStorage = (localeCode, defaultString) => {
    const LOCALE_DATA_STORAGE_KEY = import.meta.env.LOCALE_DATA_STORAGE_KEY;

    if ( !localeCode ) {
        return defaultString;
    }

    try {
        const storageLocaleData = sessionStorage.getItem(LOCALE_DATA_STORAGE_KEY);
        if ( !storageLocaleData ) {
            return defaultString;
        }

        const localeData = JSON.parse(storageLocaleData);
        if ( !localeData ) {
            return defaultString;
        }

        if ( !Array.isArray(localeData) ) {
            return defaultString;
        }

        const filteredData = localeData.filter((item) => item.chrctrCode === localeCode);
        if ( filteredData.length === 0 ) {
            return defaultString;
        }

        const decodeChrctrNm = decode(filteredData[0].chrctrNm);
        return DOMPurify.sanitize(decodeChrctrNm);
    } catch (e) {
        console.error('Invalid JSON string', e);
    }
};

/**
 * 로케일 데이터 가져오기
 * @param {null|blank||string} localeCode 
 * @param {string} defaultString 
 * @param {Array} localeDataArray 
 * @returns 
 */
export const getLocaleRedux = (localeCode, defaultString, localeDataArray) => {
    if ( !localeCode || !localeDataArray ) {
        return defaultString;
    }

    if ( !Array.isArray(localeDataArray) ) {
        return defaultString;
    }

    const filteredData = localeDataArray.filter((item) => item.chrctrCode === localeCode);
    if ( filteredData.length === 0 ) {
        return defaultString;
    }

    const decodeChrctrNm = decode(filteredData[0].chrctrNm);
    return DOMPurify.sanitize(decodeChrctrNm);
};