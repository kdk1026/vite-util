import instance from "../utils/http";

// GET 방식 두가지 타입

export const fetchImage1 = (mode, fileSeq) => {
    return instance.get(`/test/get-image?mode=${mode}&fileSeq=${fileSeq}`, {
        responseType: 'blob'
    });
};

export const fetchImage2 = (mode, fileSeq) => {
    return instance.get(`/test/get-image`, {
        params: {
            mode,
            fileSeq
        },
        responseType: 'blob'
    });
};