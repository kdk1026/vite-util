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
 * 리액트 Redux에서 로케일 데이터 가져오기
 * @param {null|blank||string} localeCode 
 * @param {string} defaultString 
 * @param {Array} reduxData 
 * @returns 
 */
export const getLocaleRedux = (localeCode, defaultString, reduxData) => {
    if ( !localeCode || !reduxData ) {
        return defaultString;
    }

    const filteredData = reduxData.filter((item) => item.chrctrCode === localeCode);
    if ( filteredData.length === 0 ) {
        return defaultString;
    }

    const decodeChrctrNm = decode(filteredData[0].chrctrNm);
    return DOMPurify.sanitize(decodeChrctrNm);
};