const database = 'myDatabase';
const objectStoreName = 'myObjectStore';

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        // IndexedDB 열기/생성
        let request = indexedDB.open(database, 1);

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
            reject(event.target.error);
        };
    });
};

export const addDbData = (data) => {
    openDatabase()
        .then(db => {
            // 트랜잭션 생성 (읽기/쓰기 모드)
            let transaction = db.transaction([objectStoreName], "readwrite");

            // 오브젝트 스토어 접근
            let objectStore = transaction.objectStore(objectStoreName);

            // 데이터 추가
            let request = objectStore.add({ id: 1, data: data });

            request.onsuccess = function() {
                console.log("데이터가 성공적으로 추가되었습니다.");
            };

            request.onerror = function(event) {
                console.log("데이터 추가 실패:", event.target.error);
            };
        })
        .catch(error => {
            console.log("데이터베이스 열기 실패:", error);
        });
};

export const getDbData = () => {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(db => {
                let transaction = db.transaction([objectStoreName], "readonly");
                let objectStore = transaction.objectStore(objectStoreName);
                let request = objectStore.get(1);

                request.onsuccess = function(event) {
                    let data = event.target.result?.data;
                    resolve(data);
                };

                request.onerror = function(event) {
                    console.log("데이터 가져오기 실패:", event.target.error);
                    resolve("");
                };
            })
            .catch(error => {
                console.log("데이터베이스 열기 실패:", error);
                resolve(error);
            });
    });
};

export const removeDbData = () => {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then(db => {
                let transaction = db.transaction([objectStoreName], "readwrite");
                let objectStore = transaction.objectStore(objectStoreName);
                let request = objectStore.clear();
    
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
    let deleteRequest = indexedDB.deleteDatabase(database);

    deleteRequest.onsuccess = function(event) {
        console.log("데이터베이스가 성공적으로 삭제되었습니다.");
    };

    deleteRequest.onerror = function(event) {
        console.log("데이터베이스 삭제 실패:", event.target.error);
    };

    deleteRequest.onblocked = function(event) {
        console.log("데이터베이스 삭제가 블록되었습니다:", event.target.error);
    };
};
