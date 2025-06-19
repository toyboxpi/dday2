@@ -1,11 +1,10 @@
function calculateDday() {
    // 시작 날짜 설정 (UTC 기준, 2024년 9월 11일 자정)
    const startDate = new Date(Date.UTC(2024, 8, 11)); // 월은 0부터 시작하므로 8이 9월
    const startDate = new Date(Date.UTC(2024, 8, 11)); // 시작 날짜 (9월 11일, 월은 0부터 시작)

    // 현재 시간 가져오기 (UTC 기준)
    // 현재 GMT 시간
    const now = new Date();

    // UTC 시간에 9시간을 더해 KST로 변환
    // GMT -> KST 변환 (9시간 더하기)
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

    // 시, 분, 초 제거하여 날짜만 비교
@@ -20,21 +19,27 @@ function calculateDday() {
    document.getElementById("dDayCounter").textContent = `방송 ${diffDays}일차`;
}

// 날짜가 자정에 자동으로 업데이트되도록 설정
function scheduleDailyUpdate() {
    const now = new Date();

    // 다음 자정 시간 계산
    const nextMidnight = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
    const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // 다음 날로 설정
        0, 0, 0, 0 // 자정 설정
    );

    // 자정까지 남은 시간 계산 (밀리초)
    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

    // 자정에 D-Day를 다시 계산하도록 타이머 설정
    // 자정에 D-Day를 다시 계산하도록 설정
    setTimeout(() => {
        calculateDday();
        scheduleDailyUpdate(); // 다음 자정을 위해 다시 호출
        scheduleDailyUpdate(); // 다음 자정을 위해 재호출
    }, timeUntilMidnight);
}

// 실행
calculateDday(); // 초기 계산
calculateDday(); // 초기 D-Day 계산
scheduleDailyUpdate(); // 자정 업데이트 예약
