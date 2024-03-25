대충 메모

postgreSQL 은 user와 database가 분리되있어 서버에서 코드상으로 연결된 user, database가 아니라면

```javascript
error: posts 테이블에 대한 접근 권한 없음
    at C:\Users\a\node-test\backend\node_modules\pg\lib\client.js:526:17
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async C:\Users\a\node-test\backend\server.js:38:24 {
  length: 107,
  severity: '오류',
  code: '42501',
  detail: undefined,
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'aclchk.c',
  line: '2809',
  routine: 'aclcheck_error'
}
```

이딴거 생성함

node.js 환경에 express 사용하면 웹클라와 port 번호가 다르기때문에 브라우저에서 거부함
cors라는 라이브러리로 크로스 브라우징을 허용해줘야함(근데 cors가 작동을 안해서 왜인지는 모름) package.json 에 proxy : local4000 설정을 추가해주니 댓슴

서버에서 post요청으로 클라에 요구사항을 들어주고
클라이언트에서 get요청으로 서버에 요청을 들어줌

postgreSQL 설치 따로 해주고 postgreADM 들가서 앵간한거 다 확인 가능

hook을 사용해서 서버에 post요청을 넣어주면 들어온 state를 가지고도 DB쿼리문 날리기 용이함

IF NOT EXISTS === 테이블이 이미있다면 오류를 반환하도록하는 구문

INSERT INTO user(user_id, pwd, gender) VALUES($1, $2, $3) RETURNING \*
이 쿼리문에서 user 테이블을 조회할때 "user"는 예약어라 컬럼 이름으로 사용할때는 꼭 따옴표로 묶어줘야댐 그래야 예약어로 인식되는걸 방지할 수 있음aaa
