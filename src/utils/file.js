/**
 * SPA 에서 파일 다운로드
 *   - axios : response.data
 *   - fetch : response.blob()
 * @param {Blob} blob 
 * @param {string} fileName 
 */
export const download = (blob, fileName) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

/**
 * 파일 확장자 추출
 * @param {Object} fileObj 
 * @returns 
 */
export const getFileExt = (fileObj) => {
    const fileName = fileObj.name;
    return fileName.substring(fileName.lastIndexOf(".") + 1);
};

/**
 * 서버단 CORS에서 Content-Disposition 헤더를 반환해야 response 파일명 가져옴
 * @param {Response} response 
 * @param {string} defaultFileName
 * @returns 
 */
export const getFileName = (response, defaultFileName) => {
	const contentDisposition = response.headers['content-disposition'] || response.headers.get('content-disposition');
    let fileName = defaultFileName;

    if ( contentDisposition ) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
		if ( fileNameMatch && fileNameMatch.length === 2 ) {
			fileName = fileNameMatch[1];
		}
    }

    return fileName;
};

/**
 * 바니어리 데이터를 이미지, 동영상, 오디오 등 다양한 미디어 데이터를 처리하기 위한 URL로 반환
 * @param {Blob} blob 
 */
export const getMediaUrl = (blob) => {
    // window.URL.createObjectURL(new Blob([blob])); 동일
    return window.URL.createObjectURL(blob);
};