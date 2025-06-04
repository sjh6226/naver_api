const startBtn = document.getElementById('startBtn');
const clickBtn = document.getElementById('clickBtn');
const msg = document.getElementById('msg');
const result = document.getElementById('result');

let startTime = 0;
let timeoutId = null;

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    clickBtn.style.display = 'none';
    result.textContent = '';
    msg.textContent = '곧 버튼이 나타납니다... 준비하세요!';
    // 1~3초 랜덤 대기
    const delay = Math.random() * 2000 + 1000;
    timeoutId = setTimeout(() => {
        msg.textContent = '지금 클릭!';
        clickBtn.style.display = 'inline-block';
        startTime = Date.now();
    }, delay);
});

clickBtn.addEventListener('click', () => {
    if (startTime === 0) return;
    const reaction = Date.now() - startTime;
    msg.textContent = '잘했어요!';
    result.textContent = `반응속도: ${reaction} ms`;
    clickBtn.style.display = 'none';
    startBtn.disabled = false;
    startTime = 0;
    clearTimeout(timeoutId);
});