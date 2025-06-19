function calculateDday() {
    const startDate = new Date(Date.UTC(2024, 8, 11)); // 시작 날짜 (9월 11일, 월은 0부터 시작)

    // 현재 GMT 시간
    const now = new Date();

    // GMT -> KST 변환 (9시간 더하기)
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

    // 시, 분, 초 제거하여 날짜만 비교
    const startDateOnly = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
    const koreaDateOnly = new Date(koreaTime.getUTCFullYear(), koreaTime.getUTCMonth(), koreaTime.getUTCDate());

    // 날짜 차이 계산 (밀리초 차이 → 일수 변환)
    const diffTime = koreaDateOnly - startDateOnly;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // 1일차 기준

    // 결과 출력
    document.getElementById("dDayCounter").textContent = `방송 ${diffDays}일차`;
}

function scheduleDailyUpdate() {
    const now = new Date();

    // 다음 자정 시간 계산
    const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // 다음 날로 설정
        0, 0, 0, 0 // 자정 설정
    );

    // 자정까지 남은 시간 계산 (밀리초)
    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

    // 자정에 D-Day를 다시 계산하도록 설정
    setTimeout(() => {
        calculateDday();
        scheduleDailyUpdate(); // 다음 자정을 위해 재호출
    }, timeUntilMidnight);
}

// 실행
calculateDday(); // 초기 D-Day 계산
scheduleDailyUpdate(); // 자정 업데이트 예약
