/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.10.26
 * @version 1.0
 */

/**
 * 사용 예시
 * const client = new SSEClient('http://localhost:8080/sse/subscribe?id=user123');
 * client.connect();
 * client.on('notification', (data) => {
 *  console.log('notification received:', data);
 * });
 */
// eslint-disable-next-line no-unused-vars
class SSEClient {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.listeners = new Map();
  }

  connect() {
    this.eventSource = new EventSource(this.url);

    // 기본 'message' 이벤트 처리
    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (this.listeners.has("message")) {
          this.listeners.get("message")(data);
        }
      } catch (e) {
        console.error(`Failed to parse SSE data: ${e}`, event.data);
      }
    };

    return this.eventSource;
  }

  // 사용자 정의 이벤트 리스너 등록
  on(eventName, handler) {
    if (this.eventSource) {
      this.eventSource.addEventListener(eventName, (event) => {
        try {
          // 데이터 파싱 처리
          const data = JSON.parse(event.data);
          handler(data);
        } catch (e) {
          console.info(`Failed JSON parse: ${e}`);
          handler(event.data); // JSON이 아닌 순수 텍스트인 경우
        }
      });
    }
  }

  close() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
