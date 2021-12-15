// burada html'de oluşturduğum input ve butonları yakaladım
const creditInput = document.getElementById("creditCard");
const checkBtn = document.getElementById("checkBtn");
const messageContainer = document.querySelector("#messageContainer");

// Kredi kartının geçerli olup olmadığını kontrol için buton elementime
// event listener ekledim
checkBtn.addEventListener("click", () => {
  // oluşturduğum fonksiyon boolean değer döndüğü için if else kontrolü yaptım
  if (isCreditCardNumberValid(creditInput.value)) {
    // kullanıcı butona bastıktan sonra input'u temizledim
    creditInput.value = "";
    return showMessage(true);
  }
  // geçersiz kredi kartı durumunda gösterdiğim mesaj
  showMessage(false);
  creditInput.value = "";
});

/**
 *
 * @param {boolean} isValid
 * Bu fonksiyon yalnızca 1 tane arguman kabul etmektedir
 * @description
 * Fonksiyon tetiklendiğinde alınan argumana göre mesaj dom'a eklenmektedir.
 * Bu mesaj kullanıcıya 3 saniyelik gösterilmekte ve sonrasında kaybolmaktadır.
 */

const showMessage = (isValid) => {
  messageContainer.innerHTML += `
  <h5 id="message" style="color:${isValid ? "green" : "red"};" >${
    isValid ? "Your card number is valid." : "Your card number is invalid"
  }<h5>
  `;
  setTimeout(function () {
    messageContainer.innerHTML = "";
  }, 3000);
};

/**
 *
 * @param {string} cardNumber
 * Bu fonksiyon yalnızca 1 tane arguman kabul etmektedir
 * @returns boolean
 * @description
 * Alınan arguman belirli validasyonlardan geçerek true ve ya false değeri dönmektedir.
 * Bu fonksiyon card numarası validator'lüğü için oluşturulmuştur
 */

const isCreditCardNumberValid = (cardNumber) => {
  let splittedCardNum;
  // bonus 1 de belirttiğiniz durumun kontrolunü yaparak yukarda oluşturduğum değişkene atamalar yaptım
  if (cardNumber.includes("-")) {
    // gelen veriği istenilen formata boşluk kontrolü yaparak çevirdim
    splittedCardNum = cardNumber.trim().split("-").join("").split("");
  } else {
    splittedCardNum = cardNumber.trim().split("");
  }

  // girilen card numarası için verilen kısıtlamalardan biri olan 16'dan büyük olma şartını değişkenime atadım
  const totalConstrait = 16;
  const lengthOfCard = splittedCardNum.length === 16;
  
  // aşağıda array methodu olan every ile oluşturduğum array içindeki tüm elemanların eşitlik durumunu kontrol etttim
  const isAllNumberSame = splittedCardNum.every(
    (val, i, arr) => val === arr[0]
  );
  const isLastNumEven =
    parseInt(splittedCardNum[splittedCardNum.length - 1]) % 2 === 0;

  // for döngüsü ile tüm arrayımı dolaşıp içindeki elemanların toplamını aldım
  let sumOfCardNum = 0;
  for (let index = 0; index < splittedCardNum.length; index++) {
    sumOfCardNum += parseInt(splittedCardNum[index]);
  }

  // task'da verilen durumları kontrol ederek boolean bir değer döndüm
  if (
    lengthOfCard &&
    !isAllNumberSame &&
    isLastNumEven &&
    sumOfCardNum > totalConstrait
  ) {
    return true;
  }

  return false;
};
