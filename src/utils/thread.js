/**
 * 지연 시키기
 * @param {number} sec 
 * @returns 
 */
export const sleep = (sec) => {
    if ( typeof sec !== 'number' ) {
        console.error('`sec` must be a number.')
        return;
    }

    let start = Date.now(),
    now = start;

    while ( now - start < sec * 1000 ) {
        now = Date.now();
    }
}