/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.09.19
 * @version 1.0
 */

/**
 * 유튜브 동영상 ID 추출
 * @param {string} url 
 * @returns 
 */
export const extractYouTubeId = (url) => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/;

    const match = RegExp(regex).exec(url);
    return match ? match[1] : null;
};

/**
 * 유튜브 공유 URL을 Embed URL로 변환
 * @param {string} shareUrl 
 * @returns 
 */
export const convertToEmbedUrl = (shareUrl) => {
    const youtebeId = extractYouTubeId(shareUrl);

    return youtebeId ? `https://www.youtube.com/embed/${youtebeId}` : null;
};