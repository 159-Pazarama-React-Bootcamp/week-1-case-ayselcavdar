// burada html'de oluşturduğum input ve butonları yakaladım
const creditInput = document.getElementById("creditCard");
const checkBtn = document.getElementById("checkBtn");

// Kredi kartının geçerli olup olmadığını kontrol için buton elementime
// event listener ekledim
checkBtn.addEventListener("click", () => {
  // oluşturduğum fonksiyon boolean değer döndüğü için if else kontrolü yaptım
  if (isCreditCardNumberValid(creditInput.value)) {
    // kullanıcı butona bastıktan sonra input'u temizledim
    creditInput.value = "";
    return alert("valid");
  }
  // geçersiz kredi kartı durumunda gösterdiğim mesaj
  alert("not valid");
  creditInput.value = "";
});

/**
 *
 * @param {string} cardNumber
 * A function that accepts only one arguments.
 * @returns boolean
 * @description
 * the function checks the given argument is valid for creadit number or not
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
  const isAllNumberSame = splittedCardNum.every((val, i, arr) => val === arr[0]);
  const isLastNumEven = parseInt(splittedCardNum[splittedCardNum.length - 1]) % 2 === 0;

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
