/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.1
 */

const database = 'myDatabase';
const objectStoreName = 'myObjectStore';

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        // IndexedDB 열기/생성
        const request = indexedDB.open(database, 1);

        // 데이터베이스 버전 업데이트 시 실행
        request.onupgradeneeded = function(event) {
            let db = event.target.result;
            db.createObjectStore(objectStoreName, { keyPath: "id" });
        };

        // 데이터베이스 열기 성공 시 실행
        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        // 데이터베이스 열기 실패 시 실행
        request.onerror = function(event) {
            const error = event.target.error;
            reject(new Error(error?.message || "데이터베이스를 여는 중 알 수 없는 오류가 발생했습니다."));
        };
    });
};

export const addDbData = async (data) => {
    if (!data) {
        console.log("데이터가 제공되지 않았습니다.");
        return;
    }

    try {
        const db = await openDatabase();
        const transaction = db.transaction([objectStoreName], "readwrite");
        const objectStore = transaction.objectStore(objectStoreName);

        const request = objectStore.put({ id: 1, data: data });

        request.onsuccess = () => {
            console.log("데이터가 성공적으로 추가/업데이트되었습니다.");
        };

        request.onerror = (event) => {
            console.log("데이터 추가 실패:", event.target.error);
        };
    } catch (error) {
        console.log("데이터베이스 열기 실패:", error);
    }
};

export const getDbData = () => {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(db => {
                const transaction = db.transaction([objectStoreName], "readonly");
                const objectStore = transaction.objectStore(objectStoreName);
                const request = objectStore.get(1);

                request.onsuccess = function(event) {
                    const result = event.target.result;
                    resolve(result ? result.data : "");
                };

                request.onerror = function(event) {
                    console.log("데이터 가져오기 실패:", event.target.error);
                    resolve("");
                };
            })
            .catch(error => {
                console.log("데이터베이스 열기 실패:", error);
                reject(error);
            });
    });
};

export const removeDbData = () => {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(db => {
                const transaction = db.transaction([objectStoreName], "readwrite");
                const objectStore = transaction.objectStore(objectStoreName);
                const request = objectStore.clear();
    
                request.onsuccess = function() {
                    console.log("IndexedDB 데이터가 성공적으로 삭제되었습니다.");
                    resolve(true);
                };
    
                request.onerror = function(event) {
                    console.log("IndexedDB 데이터 삭제 실패:", event.target.error);
                    resolve(false);
                };
            })
            .catch(error => {
                console.log("데이터베이스 열기 실패:", error);
                reject(error);
            });
    });
};

export const removeDatabase = () => {
    const deleteRequest = indexedDB.deleteDatabase(database);

    deleteRequest.onsuccess = function() {
        console.log("데이터베이스가 성공적으로 삭제되었습니다.");
    };

    deleteRequest.onerror = function(event) {
        console.log("데이터베이스 삭제 실패:", event.target.error);
    };

    deleteRequest.onblocked = function() {
        console.log("데이터베이스 삭제가 블록되었습니다. 모든 연결을 닫아야 합니다.");
    };
};
