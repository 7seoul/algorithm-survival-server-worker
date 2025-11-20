# SurvivAlgo - Worker Server

백준(Solvedac) 사용자들을 위한 알고리즘 문제 풀이 추적 및 경쟁 서비스의 워커 서버

## 환경 변수 설정

`.env` 파일 생성:

```env
MONGO_URI=mongodb://localhost:27017/survivalgo
```

**중요**: 메인 서버와 동일한 MongoDB URI를 사용해야 합니다.

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (nodemon)
npm run dev
```
