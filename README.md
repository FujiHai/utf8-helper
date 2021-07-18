## utf8-helper

A library helps you get UTF8 string.

## Install

```javascript
npm i utf8-helper
```

## Usage

```javascript
const utf8Helper = require("utf8-helper");
const encodedStr = utf8Helper.encode("Hello World!"); //\x48\x65\x6C\x6C\x6F\x20\x57\x6F\x72\x6C\x64\x21

// with prefix
const encodedStr = utf8Helper.encode("Hello World!", "\\u"); //\u48\u65\u6C\u6C\u6F\u20\u57\u6F\u72\u6C\u64\u21
```
