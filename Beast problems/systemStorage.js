// FUNCTION description
//     function that can store libraries and return them. Allows for the use of dependencies

//     Arguments
//        libName - name of the library
//        depArr - dependancy array (optional)
//        callback - callback for the library (optional)

//     If only lib name passed then library will be returned
//     If all arguments passed then library will be added.

//FUNCTION
(function () {
  //*Place to store the libraries
  libraryStorage = {};

  function librarySystem(libName, depArr, callback) {
    //.CASE 1: function called to return library
    if (arguments.length === 1) {
      return returnLibrary(libName);
    }
    //.CASE 2: function called to add library
    else {
      return addLibrary(libName, depArr, callback);
    }

    //*function to handle adding a library
    function addLibrary(libName, depArr, callback) {
      //add the library to storage
      libraryStorage[libName] = {
        dependencies: depArr,
        callback: callback,
        hasRun: false,
      };
      //.CASE 1: Library has dependencies
      if (Array.isArray(depArr) && depArr.length) {
        // first we need an array to store the dependencies
        var dependencies = [];
        // loop through depArr and check if each dependency exists
        depArr.forEach((d) => {
          // if the dependency doesnt exist then log an error
          if (!libraryStorage[d]) {
            console.error(`Library doesnt exist`);
          }
          // if it does exist then run the callback and add the result to dependencies array
          if (libraryStorage[d]) {
            dependencies.push(libraryStorage[d].callback);
          }
        });
        // if all the dependencies existed then add them to the libraries callback + set library hasRun to yes
        if (dependencies.length === depArr.length) {
          libraryStorage[libName].callback = callback(...dependencies);
          libraryStorage[libName].hasRun = true;
        }
        // if all the dependencies dont exist then set library hasRun to no
        else {
          libraryStorage[libName].dependencies = depArr;
        }
      }
      //.CASE 2: Library has no dependencies
      else if (Array.isArray(depArr)) {
        // add the library to library storage
        libraryStorage[libName].callback = callback();
        libraryStorage[libName].hasRun = true;
      }
      //.CASE 3: depArr is not an array
      else {
        console.error(`Second argument must be an arrage. Please try again`);
      }
    }

    //*function to handle returning a library
    function returnLibrary(libName) {
      //.CASE 1: library has complete dependences
      if (libraryStorage[libName].hasRun === true) {
        return libraryStorage[libName].callback;
      }
      //.CASE 2: library does not have complete dependencies
      else {
        addLibrary(
          libName,
          libraryStorage[libName].dependencies,
          libraryStorage[libName].callback
        );
      }
    }
  }
  //*adding the functions to the window object to use
  window.librarySystem = librarySystem;
})();
