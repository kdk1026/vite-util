export const getSessionStorageSize = () => {
    let total = 0;
    for (let key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) {
            total += sessionStorage[key].length * 2; // UTF-16 문자의 바이트 수
        }
    }
    console.log(`세션 스토리지 사용량: ${readableFileSize(total)}`);
}
const readableFileSize = (size) => {
    if (size == 0) return '0';
    var _arrDataUnits = ['B', 'KB', 'MB', 'GB', 'TB'];
    var _i = Number(Math.floor(Math.log(size) / Math.log(1024)));
    return Math.round(size / Math.pow(1024, _i)) + ' ' + _arrDataUnits[_i];
}