const numberInput = document.getElementById('numberInput');
const numberText = document.getElementById('numberText');

numberInput.addEventListener('input', (event) => {
    const value = parseInt(event.target.value, 10);

    if (isNaN(value)) {
        numberText.textContent = 'لطفاً یک عدد معتبر وارد کنید!';
    } else {
        numberText.textContent = convertToPersianWords(value);
    }
});

function convertToPersianWords(number) {
    const persianNumbers = [
        '', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه', 'ده',
        'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده',
        'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود',
        'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'
    ];

    const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

    if (number === 0) return 'صفر';

    let words = '';
    let chunkCount = 0;

    while (number > 0) {
        const chunk = number % 1000;
        if (chunk > 0) {
            const chunkWords = convertChunk(chunk, persianNumbers);
            words = chunkWords + (chunkCount > 0 ? ` ${thousands[chunkCount]}` : '') + ' ' + words;
        }
        number = Math.floor(number / 1000);
        chunkCount++;
    }

    return words.trim();
}

function convertChunk(chunk, persianNumbers) {
    let result = '';
    const hundreds = Math.floor(chunk / 100);
    const tensAndUnits = chunk % 100;

    if (hundreds > 0) {
        result += persianNumbers[27 + hundreds] + ' ';
    }

    if (tensAndUnits > 0) {
        if (tensAndUnits <= 20) {
            result += persianNumbers[tensAndUnits];
        } else {
            const tens = Math.floor(tensAndUnits / 10);
            const units = tensAndUnits % 10;
            result += persianNumbers[18 + tens];
            if (units > 0) {
                result += ' و ' + persianNumbers[units];
            }
        }
    }

    return result.trim();
}
