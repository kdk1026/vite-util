/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.1
 */

/**
 * SPA 에서 파일 다운로드
 *   - axios : response.data (ArrayBuffer)
 *   - fetch : response.blob() (Blob)
 * @param {ArrayBuffer|Blob} data 
 * @param {string} fileName 
 */
export const download = (data, fileName) => {
    if ( !data || (!(data instanceof ArrayBuffer) && !(data instanceof Blob)) ) {
        console.error("Invalid data provided for download. Expected ArrayBuffer or Blob.");
        return;
    }

    if ( !fileName?.trim() ) {
        console.error("File name is required for download.");
    } else if ( typeof fileName !== 'string' ) {
        console.error("File name must be a string.");
        return;
    }

    const decodeFileName = decodeURIComponent(fileName).replaceAll('+', ' ');

    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", decodeFileName);
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, 1000);
};

/**
 * 파일 확장자 추출
 * @param {object} fileObj 
 * @returns 
 */
export const getFileExt = (fileObj) => {
    if ( !fileObj?.name ) {
        console.error("Invalid file object provided.");
        return null;
    }

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
    if ( !(response instanceof Response) || !response.headers ) {
        console.error("Invalid response object provided.");
        return null;
    }

    if ( typeof defaultFileName !== 'string' || !defaultFileName?.trim() ) {
        console.error("Default file name is required and must be a non-empty string.");
        return null;
    }

	const contentDisposition = response.headers['content-disposition'] || response.headers.get('content-disposition');
    let fileName = defaultFileName;

    if ( contentDisposition ) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
		if ( fileNameMatch && fileNameMatch.length === 2 ) {
			fileName = fileNameMatch[1];
		}
    }

    return decodeURIComponent(fileName).replaceAll('+', ' ');
};

/**
 * 바니어리 데이터를 이미지, 동영상, 오디오 등 다양한 미디어 데이터를 처리하기 위한 URL로 반환
 * @param {ArrayBuffer|Blob} data  
 */
export const getMediaUrl = (data) => {
    if ( !data || (!(data instanceof ArrayBuffer) && !(data instanceof Blob)) ) {
        console.error("Invalid data provided for download. Expected ArrayBuffer or Blob.");
        return;
    }

    return window.URL.createObjectURL(data);
};

export const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
export const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'hwp', 'txt'];
export const archiveExtensions = ['zip', 'rar', '7z'];
export const audioExtensions = ['mp3', 'wav'];
export const videoExtensions = ['mp4', 'avi', 'mov', 'mkv'];

export const allowedExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp',
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',   
    'hwp', 'txt', 'zip'
];

export const MAX_FILE_SIZE = 20 * 1024 * 1024;

/**
 * 파일 용량 체크
 * @param {object} fileObj 
 * @param {(undefined|null|number)} maxFileSize 
 * @returns 
 */
export const checkFileSize = (fileObj, maxFileSize) => {
    if ( !fileObj?.name ) {
        console.error("Invalid file object provided.");
        return null;
    }

    if ( !maxFileSize ) {
        maxFileSize = MAX_FILE_SIZE;
    }

    const fileSize = fileObj.size;
    return fileSize > maxFileSize;
};

/**
 * 파일 ByteArray(Blob)를 Base64 데이터로 변환
 * @param {Blob} fileByteArray
 * @param {string} fileName
 * @returns {Promise<string>} 'data:...' 접두사가 제거된 순수한 Base64 데이터 문자열을 resolve하는 Promise.
 */
export const blobToBase64 = (fileByteArray, fileName) => {
	const file = new File([fileByteArray], fileName, { type: fileByteArray.type });

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const result = reader.result;

            if ( typeof result === 'string' ) {
                const base64String = result.split(',')[1];
                resolve(base64String || '');
            } else {
                reject(new Error('Failed to convert blob to base64 string.'));
            }
        };

        reader.onerror = () => {
            reject(reader.error || new Error('FileReader error occurred.'));
        };

        reader.readAsDataURL(file);
    });
};

/**
 * 파일 크기를 바이트(Byte) 단위에서 사람이 읽기 쉬운 형식(B, KB, MB 등)으로 변환
 */
export const readableFileSize = (size) => {
    if ( typeof size !== 'number' ) {
        console.error("size is not number");
        return;
    }

    if (size == 0) return '0';
    const arrDataUnits = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Number(Math.floor(Math.log(size) / Math.log(1024)));
    return Math.round(size / Math.pow(1024, i)) + '' + arrDataUnits[i];
}