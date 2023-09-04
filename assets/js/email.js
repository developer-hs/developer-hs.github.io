(function () {
  emailjs.init("bQhWhaHzc_Moncvc1");
})();
const emailIsValid = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const pattern = /^01\d{9}$/;
  return pattern.test(phoneNumber);
};

const submitBtn = document.getElementById("emailSubmitBtn");
submitBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!isValidPhoneNumber(phone)) {
    alert("전화번호를 다시 확인해 주세요.");
    return;
  }
  if (!emailIsValid(email)) {
    alert("이메일을 다시 확인해 주세요.");
    return;
  }

  const templateParams = {
    name,
    phone,
    email,
    message,
  };

  emailjs.send("service_vax2rzg", "template_q6465gn", templateParams).then(
    function (res) {
      if (res.status === 200) {
        let today = new Date();
        var year = today.getFullYear();
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var day = ("0" + today.getDate()).slice(-2);
        var dateString = year + "년 " + month + "월 " + day + "일";
        localStorage.setItem("prev_contact", JSON.stringify({ ...templateParams, created_at: dateString }));
        alert("성공적으로 전송 되었습니다.");
        location.reload();
      }
    },
    function (error) {
      alert("문의글 작성에 실패 하였습니다." + "\n" + "rlagudtjq2016@naver.com 으로 연락 부탁드립니다.");
      console.log("FAILED....", error);
    }
  );
});
