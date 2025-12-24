/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.10.26
 * @version 1.1
 */

/**
 * 사용 예시
 * const client = new SSEClient('http://localhost:8080/sse/subscribe?id=user123');
 * client.connect();
 * client.on('notification', (data) => {
 *  console.log('notification received:', data);
 * });
 */
export class SSEClient {

  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.listeners = new Map();
    this.errorCallback = null;
  }

  onError(callback) {
    this.errorCallback = callback;
  }

  connect() {
    if (this.eventSource) return this.eventSource;

    this.eventSource = new EventSource(this.url);

    // 기본 'message' 이벤트 처리
    this.eventSource.onmessage = (event) => {
      this._handleEvent("message", event);
    };

    this.eventSource.onerror = (event) => {
      if (this.errorCallback) this.errorCallback(event);
    };

    return this.eventSource;
  }

  /**
   * 사용자 정의 이벤트 리스너 등록
   * @param {string} eventName 
   * @param {Function} handler 
   */
  on(eventName, handler) {
    this.listeners.set(eventName, handler);

    if (this.eventSource) {
      this.eventSource.addEventListener(eventName, (event) => {
        this._handleEvent(eventName, event);
      });
    }
  }

  _handleEvent(eventName, event) {
    const handler = this.listeners.get(eventName);
    if (!handler) return;

    const rawData = event.data;
    let finalData;

    try {
      finalData = JSON.parse(rawData);
    } catch (error) {
      finalData = rawData;

      if (this.errorCallback) {
        this.errorCallback({ type: 'ParseError', error, rawData });
      }
    }

    handler(finalData);
  }

  close() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
