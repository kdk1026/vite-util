/**
 * SPA 에서 파일 다운로드
 * @param {*} data 
 * @param {*} fileName 
 */
export const download = (data, fileName) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};