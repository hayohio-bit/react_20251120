import emotion1 from "./img/emotion1.png";
import emotion2 from "./img/emotion2.png";
import emotion3 from "./img/emotion3.png";
import emotion4 from "./img/emotion4.png";
import emotion5 from "./img/emotion5.png";

// getEmotionImgById의 매개변수 emotionId에 페이지나 컴포넌트에서 전달된 img번호 저장됨
// emotionId가 숫자로 제공될 수 있으므로 String 메서드를 이용해 명시적 형변환
// switch 문으로 번호와 일치하는 이미지를 찾아 반환
export const getEmotionImgById = (emotionId) => {
    const targetEmotionId = String(emotionId);
    switch (targetEmotionId) {
        case "1":
            return emotion1;
        case "2":
            return emotion2;
        case "3":
            return emotion3;
        case "4":
            return emotion4;
        case "5":
            return emotion5;
        default:
            return null;
    }
}