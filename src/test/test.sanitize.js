import { encode, decode } from "html-entities";
import DOMPurify from 'dompurify';

const html = '<div onclick="alert(1);">테스트</div>';

console.log( 'encode : ', encode(html) );
console.log( 'decode : ', decode(encode(html)) );

console.log( 'dompurify : ', DOMPurify.sanitize(html) ) ;