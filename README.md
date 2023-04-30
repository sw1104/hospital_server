# hospital_server

### 구현 사항

- [x] 로그인 (id, pw 필요)
- [x] refresh 토큰으로 access 토큰 재 발급 (refreshToken 필요)
  - `jwt`를 이용하여 `accessToken`과 `refreshToken`을 발급한 뒤 `accessToken`이 만료되면 `refreshToken`을 이용하여 `accessToken`을 재 발급 받을 수 있도록 구현하였습니다.

<br>

- [x] 환자 생성 (accessToken 필요) - 주민번호 복호화를 위해 양방향 암호화 방식인 `encrypt`를 이용하여 주민번호를 암호화 하여 저장 하였습니다.
      <br>

- [x] 환자 조회 (accessToken 필요)
  - `encrypt`를 이용하여 암호화 된 주민번호를 복호화 하였습니다.

<br>

- [x] 환자 수정 (accessToken 필요)
  - 클라이언트로부터 받아오는 수정 데이터가 매번 다르기 때문에 그때그때 데이터에 맞게 구성이 되도록 구현 하였습니다.

<br>

- [x] 환자 삭제 (accessToken 필요)

<br>

- [x] 이미지 로컬에서 저장 (accessToken 필요)
  - `multer`를 이용하여 scr/imageFiles 폴더에 사진이 저장되도록 구현 하였습니다.

### Stack

`Javascript`, `Express`. `MySQL`

### 파일 구조

📦src
┣ 📂controllers
┃ ┣ 📜patients.js
┃ ┗ 📜user.js
┣ 📂imageFiles
┣ 📂middlewares
┃ ┣ 📜imageFile.js
┃ ┣ 📜jwtAuth.js
┃ ┗ 📜refresh.js
┣ 📂models
┃ ┣ 📜patients.js
┃ ┗ 📜user.js
┣ 📂routes
┃ ┣ 📜index.js
┃ ┣ 📜patients.js
┃ ┗ 📜user.js
┣ 📂services
┃ ┣ 📜patients.js
┃ ┗ 📜user.js
┗ 📂utils
┃ ┣ 📜baseError.js
┃ ┗ 📜errorHandler.js
┃ 📜.eslintrc
┃ 📜.gitignore
┃ 📜.prettierrc
┃ 📜app.js
┃ 📜db.js
┃ 📜package-lock.json
┃ 📜package.json
┃ 📜README.md
┃ 📜server.js

### 프로젝트 실행 방법

> npm i
> npm start

### database setting

```javascript
// ./db.js

const appDataSource = mysql.createPool({
  host: localhost,
  user: 유저이름,
  password: 패스워드,
  port: mysql port,
  database: database name,
});
```
