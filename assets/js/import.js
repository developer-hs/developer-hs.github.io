const importHTML = (filename, importedId) => {
  // XMLHttpRequest 객체를 생성합니다.

  const xhttp = new XMLHttpRequest();

  // xhttp의 onreadystatechange 이벤트를 이용해 AJAX 응답을 처리합니다.
  xhttp.onreadystatechange = function () {
    // 상태가 4(완료)이고 상태 코드가 200(성공)일 때
    if (this.readyState == 4 && this.status == 200) {
      const html = xhttp.responseText.split("<script>");

      // 가져온 응답을 빈 div에 삽입합니다.

      document.getElementById(importedId).innerHTML += html[0];

      if (html.length > 1) {
        for (let i = 1; i < html.length; i++) {
          const script = html[i].replace("</" + "script>", "");
          const scriptElm = document.createElement("script");
          scriptElm.innerHTML = script;
          document.body.appendChild(scriptElm);
        }
      }
    }
  };

  // GET 메서드를 사용해 내용을 가져오려는 HTML 파일 위치로 AJAX 요청을 보냅니다.
  xhttp.open("GET", filename, true); // true는 비동기적으로 전송하겠다는 의미입니다.
  xhttp.send();
};

export default importHTML;
