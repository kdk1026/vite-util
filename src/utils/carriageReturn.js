const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

export const changeBrTag = (content) => {
    if (typeof content !== 'string' || !content.trim()) {
        return '';
    }

    /*
        \r\n 윈도우
        \r 구형 Mac (9버전 이하)
        \n 유닉스, 리눅스, 최신 Mac
    */
    const safeContent = escapeHtml(content);
    return safeContent.replace(/(\r\n|\r|\n)/g, '<br />');
};