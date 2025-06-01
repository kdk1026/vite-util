import { isPossiblePhoneNumber } from "libphonenumber-js";
import { parsePhoneNumber } from "libphonenumber-js/min";

console.log( isPossiblePhoneNumber('010-1234-5678', 'KR') );
console.log( isPossiblePhoneNumber('01012345678', 'KR') );

console.log( isPossiblePhoneNumber('02-1234-5678', 'KR') );
console.log( isPossiblePhoneNumber('02-123-5678', 'KR') );

console.log( isPossiblePhoneNumber('031-1234-5678', 'KR') );

// XXX 형식만 체크하므로 국내 번호는 정규식으로 체크하고, 해외 번호 필요 시 사용하면 될 듯
console.log( isPossiblePhoneNumber('039-1234-5678', 'KR') );

// XXX 하이픈 포맷은 사용하면 좋을 듯, 하지만 입력 시 하이픈을 넣어야 하므로 역시 따로 구현
let phoneNumber = parsePhoneNumber('01099243732', 'KR');
console.log( phoneNumber.formatNational() );

phoneNumber = parsePhoneNumber('0212345678', 'KR');
console.log( phoneNumber.formatNational() );

// XXX 국제전화 국가번호 포함 시, 국가코드가 필요한 경우 사용하면 좋을 듯
phoneNumber = parsePhoneNumber('+8201099243732');
console.log( phoneNumber.country );