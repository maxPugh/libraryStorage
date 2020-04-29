function isPrototypeOf(specimen, analogue) {
  var anal = analogue.__proto__ ? analogue.__proto__ : analogue;
  //!RECURSIVE CASE
  if (anal && anal.__proto__) {
    var test = isPrototypeOf(specimen, anal.__proto__);
    if (test === true) {
      return true;
    }
  }

  //.CASE 1: If both are null then return false
  if (Object.getOwnPropertyNames(specimen).length === 0) {
    return false;
  }

  //Store length for both object.keys
  var specKeys = Object.getOwnPropertyNames(specimen);
  var analKeys = Object.getOwnPropertyNames(anal);
  // if they are of equal length then continue else return false
  if (specKeys.length === analKeys.length) {
    // loop through and compare each element in keys of specimen and compare to analogue
    for (let i = 0; i < specKeys.length; i++) {
      var a = specKeys[i];
      // if any dont match then return false
      if (specimen[a] !== anal[a]) {
        return false;
      }
    }
    // if all match then return true
    return true;
  } else {
    return false;
  }
}
