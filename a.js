function convertNumberToWords(number) {
    const numberWords = [
      'không',
      'một',
      'hai',
      'ba',
      'bốn',
      'năm',
      'sáu',
      'bảy',
      'tám',
      'chín'
    ];
  
    // Kiểm tra số có hợp lệ và không âm
    if (!Number.isInteger(Number(number)) || Number(number) < 0) {
      return 'Không hợp lệ';
    }
  
    // Xử lí trường hợp số từ 0-9
    if (Number(number) >= 0 && Number(number) <= 9) {
      return numberWords[Number(number)];
    }
  
    // Xử lí trường hợp số từ 10 trở đi
    const tensWords = [
      '',
      'mười',
      'hai mươi',
      'ba mươi',
      'bốn mươi',
      'năm mươi',
      'sáu mươi',
      'bảy mươi',
      'tám mươi',
      'chín mươi'
    ];
  
    const units = Number(number) % 10;
    const tens = Math.floor(number / 10);
  
    return tensWords[tens] + ' ' + numberWords[units];
  }

  console.log(convertNumberToWords(11))

  var text = 'Xin Chào Các Bạn';
  var ar = Array.from(text);
  var j = 1;
  var bruhtext = '';
  for (let i of ar) {
    if (i ==' ') {
      bruhtext+= ' '
      continue;
    }
    if (j == 1) {
      bruhtext+= i.toLowerCase();
      j++
      continue;
    }
    else if (j==2) {
      bruhtext += i.toUpperCase();
      j=1;
      continue;
    }
  }
  console.log(bruhtext)