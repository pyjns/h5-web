function AccAdd(num1, num2) {
  let d1 = 0, d2 = 0, m, c;

  if (num1.toString().indexOf(".") > -1) {
    d1 = num1.toString().split(".")[1].length;
  }

  if (num2.toString().indexOf(".") > -1) {
    d2 = num2.toString().split(".")[1].length;
  }

  m = Math.pow(10, Math.max(d1, d2));
  c = Math.abs(d1 - d2);
  if (c > 0) {
    let cm = Math.pow(10, c);
    if (d1 > d2) {
      num1 = Number(num1.toString().replace(".", ""));
      num2 = Number(num2.toString().replace(".", "")) * cm;
    } else {
      num1 = Number(num1.toString().replace(".", "")) * cm;
      num2 = Number(num2.toString().replace(".", ""));
    }
  } else {
    num1 = Number(num1.toString().replace(".", ""));
    num2 = Number(num2.toString().replace(".", ""));
  }
  return (num1 + num2) / m;
}


function AccMul(num1, num2) {
  let m = 0,
    s1 = num1.toString(),
    s2 = num2.toString();

  if (s1.indexOf(".") > -1) {
    m += s1.split(".")[1].length;
  }

  if (s2.indexOf(".") > -1) {
    m += s2.split(".")[1].length;
  }

  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

function AccSub(num1, num2) {
  let d1 = 0, d2 = 0, m;

  if (num1.toString().indexOf(".") > -1) {
    d1 = num1.toString().split(".")[1].length;
  }

  if (num2.toString().indexOf(".") > -1) {
    d2 = num2.toString().split(".")[1].length;
  }

  m = Math.pow(10, Math.max(d1, d2));
  return (AccMul(num1, m) - AccMul(num2, m)) / m;
}

function AccDiv(num1, num2) {
  let d1 = 0,
    d2 = 0,
    i1,
    i2;

  if (num1.toString().indexOf(".") > -1) {
    d1 = num1.toString().split(".")[1].length;
  }

  if (num2.toString().indexOf(".") > -1) {
    d2 = num2.toString().split(".")[1].length;
  }

  i1 = Number(num1.toString().replace(".", ""));
  i2 = Number(num2.toString().replace(".", ""));
  return AccMul(i1 / i2, Math.pow(10, d2 - d1));
}

function JsToFixed(num1, num2) {
  let result = Math.round(num1 * Math.pow(10, num2)) / Math.pow(10, num2);
  return result.toFixed(num2);
}

export {
  AccAdd,
  AccSub,
  AccMul,
  AccDiv,
  JsToFixed,
};
