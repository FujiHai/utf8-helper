/**
 * Convert binary number to decimal number.
 * @param {*} binaryNum
 */
const binaryNum2Decimal = (binaryNum) => {
  if (isNaN(binaryNum)) {
    return;
  }

  return binaryNum.toString(10);
};

/**
 * Convert binary number to hexadecimal number.
 * @param {*} binaryNum
 */
const binaryNum2Hex = (binaryNum) => {
  if (isNaN(binaryNum)) {
    return;
  }

  return binaryNum.toString(16);
};

/**
 * Get one byte hexadecimal value.
 * @param {*} codepoint
 */
const getOneByteHexArr = (codepoint) => {
  return [binaryNum2Hex(codepoint & 0x7f)];
};

/**
 * Get two bytes hexadecimal value.
 * @param {*} codepoint
 */
const getTwoBytesHexArr = (codepoint) => {
  const fstByteLow = (codepoint >> 6) & 0x1f;
  const fstByteHigh = 0xdf & 0xe0;

  const secByteLow = codepoint & 0x3f;
  const secByteHigh = 0xbf & 0xc0;
  return [
    binaryNum2Hex(fstByteHigh | fstByteLow),
    binaryNum2Hex(secByteHigh | secByteLow),
  ];
};

/**
 * Get three bytes hexadecimal value.
 * @param {*} codepoint
 */
const getThreeBytesHexArr = (codepoint) => {
  const fstByteLow = (codepoint >> 12) & 0x0f;
  const fstByteHigh = 0xef & 0xe0;

  const secByteLow = (codepoint >> 6) & 0x3f;
  const secByteHigh = 0xbf & 0xc0;

  const trdByteLow = codepoint & 0x3f;
  const trdByteHigh = 0xbf & 0xc0;

  return [
    binaryNum2Hex(fstByteHigh | fstByteLow),
    binaryNum2Hex(secByteHigh | secByteLow),
    binaryNum2Hex(trdByteHigh | trdByteLow),
  ];
};

/**
 * Get four bytes hexadecimal value.
 * @param {*} codepoint
 */
const getFourBytesHexArr = (codepoint) => {
  const fstByteLow = (codepoint >> 18) & 0x07;
  const fstByteHigh = 0xf7 & 0xc0;

  const secByteLow = (codepoint >> 12) & 0x3f;
  const secByteHigh = 0xbf & 0xc0;

  const trdByteLow = (codepoint >> 6) & 0x3f;
  const trdByteHigh = 0xbf & 0xc0;

  const fthByteLow = codepoint & 0x3f;
  const fthByteHigh = 0xbf & 0xc0;

  return [
    binaryNum2Hex(fstByteHigh | fstByteLow),
    binaryNum2Hex(secByteHigh | secByteLow),
    binaryNum2Hex(trdByteHigh | trdByteLow),
    binaryNum2Hex(fthByteHigh | fthByteLow),
  ];
};

/**
 * Get code point bytes count in memory.
 * @param {*} codepoint
 */
const getCodePointBytesCount = (codepoint) => {
  if (isNaN(codepoint)) {
    return;
  }

  const codePointRanges = [
    {
      min: 0x00000000,
      max: 0x0000007f,
      count: 1,
    },
    {
      min: 0x00000080,
      max: 0x000007ff,
      count: 2,
    },
    {
      min: 0x00000800,
      max: 0x0000ffff,
      count: 3,
    },
    {
      min: 0x00010000,
      max: 0x0010ffff,
      count: 4,
    },
  ];

  return codePointRanges.find(
    (range) =>
      codepoint >= binaryNum2Decimal(range.min) &&
      codepoint <= binaryNum2Decimal(range.max)
  ).count;
};

/**
 * Get encoded UTF8 hex array.
 * @param {*} codepoint
 */
const getUTF8EncodedArr = (codepoint) => {
  const count = getCodePointBytesCount(codepoint);

  const funMap = {
    1: getOneByteHexArr,
    2: getTwoBytesHexArr,
    3: getThreeBytesHexArr,
    4: getFourBytesHexArr,
  };

  return funMap[count](codepoint);
};

/**
 * Get char UTF8 code with prefix.
 * @param {*} chars hexArr
 * @param {*} prefix single char code string prefix
 */
const getSingleCharUTF8Code = (hexArr = [], prefix = "\\x") => {
  let res = "";

  if (hexArr.length > 0) {
    hexArr.forEach((hexItem) => {
      res += prefix + hexItem.toUpperCase();
    });
  }

  return res;
};

/**
 * Get UTF8 string.
 * @param {*} str
 */
exports.encode = (str) => {
  let res = "";
  const chars = [...str];

  if (chars.length > 0) {
    chars.forEach((char) => {
      const charCodePoint = char.codePointAt(0);
      res += getSingleCharUTF8Code(getUTF8EncodedArr(charCodePoint));
    });
  }

  return res;
};

export default { encode };
