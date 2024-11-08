const characters = [
    { name: "도라", englishName: "Dora", image: "도라.png" },
    { name: "무스카", englishName: "Muska", image: "무스카.png" },
    { name: "시타", englishName: "Sita", image: "시타.png" },
    { name: "바론", englishName: "Baron", image: "바론.png" },
    { name: "하루", englishName: "Haru", image: "요시오카 하루.png" },
    { name: "사츠키", englishName: "Satsuki", image: "쿠사카베 사츠키.png" },
    { name: "메이", englishName: "May", image: "쿠사카베 메이.png" },
    { name: "마녀", englishName: "Witch", image: "황야의 마녀.png" },
    { name: "소피", englishName: "Sophie", image: "소피.png" },
    { name: "포뇨", englishName: "Ponyo", image: "포뇨.png" },
];

// 기본 게임 설정
const totalQuestions = 6;  // 출제할 문제 수 (6개로 고정)
let currentCharacterIndex = 0;
let score = 0; // 초기 점수 설정
let timeLeft = 20; // 시간 제한(초)
let timer; // 타이머 변수
let shuffledCharacters = []; // 섞인 문제 배열

// 문제 로드시 
document.addEventListener("DOMContentLoaded", () => {
    shuffledCharacters = getRandomCharacters(characters, totalQuestions); // 문제 배열 섞기
    loadCharacter();  // 페이지가 로드된 후 첫 번째 문제를 불러옴
});

// 10개 중 6개 캐릭터 랜덤 선택
function getRandomCharacters(array, num) {
    const shuffledArray = shuffleArray([...array]); // 배열 섞기
    return shuffledArray.slice(0, num); // 섞은 배열에서 num개만 선택
}

// 배열을 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 두 요소를 교환
    }
    return array;
}

// 게임 시작 시 첫 번째 캐릭터 로드
function loadCharacter() {
    const character = shuffledCharacters[currentCharacterIndex];
    
    // 이미지 표시
    const imageElement = document.getElementById("character-image");
    imageElement.src = character.image;

    // 이미지 로드 체크
    imageElement.onload = () => {
        document.getElementById("result").innerText = ''; 
        document.getElementById("answer-input").value = ''; 
        document.getElementById("answer-input").disabled = false; // 입력 필드 활성화
        resetTimer(); // 타이머 초기화

        // 남은 문제 수 업데이트
        document.getElementById("questions-left").innerText = shuffledCharacters.length - currentCharacterIndex;
    }

    //  오류 
    imageElement.onerror = () => {
        console.error("이미지 로드 실패: " + character.image);
        document.getElementById("result").innerText = "이미지를 불러올 수 없습니다. 파일 경로를 확인하세요.";
    };
}

// 시간 설정
function resetTimer() {
    clearInterval(timer);
    timeLeft = 20; // 초기 시간 설정
    document.getElementById("timer").innerText = `남은 시간: ${timeLeft}초`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `남은 시간: ${timeLeft}초`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("result").innerText = "시간이 다 되었습니다!"; // 시간 초과 시 메시지
            document.getElementById("answer-input").disabled = true;
        }
    }, 1000);
}

function nextCharacter() {
    currentCharacterIndex++;
    if (currentCharacterIndex < shuffledCharacters.length) {
        loadCharacter();
    } else {
        endGame();
    }
}

// 제출 버튼 클릭
document.getElementById("submit-button").addEventListener("click", () => {
    const answer = document.getElementById("answer-input").value.trim().replace(/\s+/g, '').toLowerCase(); // 공백 제거 및 소문자 변환
    const correctAnswer = shuffledCharacters[currentCharacterIndex].name.trim().replace(/\s+/g, '').toLowerCase(); // 정답의 공백 제거 및 소문자 변환
    const correctEnglishAnswer = shuffledCharacters[currentCharacterIndex].englishName.trim().replace(/\s+/g, '').toLowerCase(); // 영어 정답의 공백 제거 및 소문자 변환

    // 부분 이나 정답이 포함이 있으면 정답처리
    if (answer.includes(correctAnswer) || answer.includes(correctEnglishAnswer)) {
        score += 10; // 점수 10점
        document.getElementById("result").innerText = "정답입니다! 🎉";
        document.getElementById("score").innerText = `현재 점수: ${score}`; // 점수 표시 업데이트
        clearInterval(timer); // 정답 맞히면 타이머 멈추기
    } else {
        document.getElementById("result").innerText = "틀렸습니다!";
    }
});

// 다음 문제로 넘기기 버튼 
document.getElementById("next-button").addEventListener("click", () => {
    nextCharacter();
});

// 나가기 버튼 클릭시 초기화 및 메인으로 이동
document.getElementById("reset-button").addEventListener("click", () => {
    localStorage.removeItem('players');
    window.location.href = 'lobby.html'; // 소개 페이지로 이동 --------------------------------------------------------------
});

// 게임 종료 처리
function endGame() {
    clearInterval(timer); // 타이머 정지

    const playerName = prompt("이름을 입력하세요:"); // 플레이어 이름 입력
    if (playerName) {
        // 기존에 저장된 플레이어 리스트를 로드
        let players = JSON.parse(localStorage.getItem('players')) || [];

        // 새로운 플레이어 추가
        players.push({ name: playerName, score: score });

        // 점수 내림차순으로 정렬
        players.sort((a, b) => b.score - a.score);

        // 로컬 스토리지에 점수 저장
        localStorage.setItem('players', JSON.stringify(players));

        // 5명이 넘으면 자동 초기화
        if (players.length > 5) {
            alert("플레이어가 5명이 넘었습니다. 순위가 초기화됩니다.");
            localStorage.removeItem('players'); // 순위 초기화
        } else {
            // 5명이 안 넘으면 점수 저장
            localStorage.setItem('players', JSON.stringify(players));
        }
    }

    // 결과 페이지로 이동
    window.location.href = 'result.html'; // 순위표 페이지로 이동
}
