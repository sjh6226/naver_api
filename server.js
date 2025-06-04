// 네이버 오픈API 클라이언트 아이디/시크릿 (본인 값으로 변경)
const client_id = '50_EjeG_K9XtHIhXv6pm';
const client_secret = 'NwDa4wn2E7';


// Express 모듈 불러오기
var express = require('express');
var app = express();




// 블로그 검색 API 엔드포인트
app.get('/search/blog', function (req, res) {
  // 검색어를 쿼리스트링에서 받아와 네이버 API URL 생성
  var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // JSON 결과
  // var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과

  // request 모듈 불러오기
  var request = require('request');
  // 네이버 API 요청 옵션 (헤더에 인증 정보 포함)
  var options = {
    url: api_url,
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
  };
  // 네이버 API에 GET 요청
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // 성공 시 결과를 클라이언트에 반환
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      // 실패 시 상태코드 반환 및 에러 로그
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

// 3000번 포트에서 서버 시작
app.listen(3000, function () {
  console.log('http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!');
});