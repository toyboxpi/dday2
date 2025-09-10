// KST(Asia/Seoul) 기준으로 '연-월-일'만 가진 날짜 객체(UTC anchor) 만들기
function dateOnlyInTZ(date = new Date(), timeZone = 'Asia/Seoul') {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [y, m, d] = fmt.format(date).split('-').map(Number);
  // 날짜만 비교하도록 UTC 자정 기준 앵커 생성 (시간대 영향 제거)
  return new Date(Date.UTC(y, m - 1, d));
}

function calculateDday() {
  // 시작일을 'KST 달력 날짜'로 고정
  const startDateOnlyKST = dateOnlyInTZ(new Date('2024-09-11'), 'Asia/Seoul');
  const todayOnlyKST = dateOnlyInTZ(new Date(), 'Asia/Seoul');

  const diffTime = todayOnlyKST - startDateOnlyKST;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // +1/-1 없음

  document.getElementById("dDayCounter").textContent = `방송 ${diffDays}일차`;
}

function scheduleDailyUpdate() {
  // 다음 KST 자정에 다시 계산
  const now = new Date();
  const todayKST = dateOnlyInTZ(now, 'Asia/Seoul'); // KST 자정 앵커
  const nextMidnightKST_UTCms = todayKST.getTime() + 24 * 60 * 60 * 1000;
  const msUntilNextMidnight = nextMidnightKST_UTCms - now.getTime();

  setTimeout(() => {
    calculateDday();
    scheduleDailyUpdate();
  }, msUntilNextMidnight);
}

// 실행
calculateDday();
scheduleDailyUpdate();
