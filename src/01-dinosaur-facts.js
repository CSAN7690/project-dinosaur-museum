/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
// Initial value of accumulator is set to "null" since there may be no dinos 🦖 in the input array.
function getLongestDinosaur(dinosaurs) {
  let longestDino = { name: null, height: 0 };

  // Loop through each dino 🦖 in the array then convert the length of the dino 🦖 from meters to feet.
  // If the height of the current dino 🦖 is > than the height of the longest dinosaur so far, update the longest dino 🦖 
  // object w/ the current dinosaur's 🦖 name & height.
  for (let dino of dinosaurs) {
    let heightInFeet = dino.lengthInMeters * 3.281;
    if (heightInFeet > longestDino.height) {
      longestDino.name = dino.name;
      longestDino.height = heightInFeet;
    }
  }

  // If a longest dino 🦕 was found, return an object with its name & height in feet.
  // If NOT, return ⏎ an empty object 🪫
  if (longestDino.name) {
    return { [longestDino.name]: parseFloat(longestDino.height.toFixed(2)) };
  } else {
    return {};
  }
}


/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  // Find the dinosaur 🦕 object with the given ID
  const dinosaur = dinosaurs.find(dino => dino.dinosaurId === id);

  //If no dinosaur 🦕 is found, return na error message 
  if (!dinosaur) {
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  }

  // Intialize the `mya` variable
  let mya;

  // Check if the `mya` array has only one value, and assign the corresponding string to `mya`
  if (dinosaur.mya.length === 1) {
    mya = `${dinosaur.mya[0]} million years ago`;
  } else {
    // If the `mya` array has two values, format them as a range
    mya = `${dinosaur.mya[0]}-${dinosaur.mya[1]} million years ago`;
  }

  //Return a string containg the 🦕dino's name pronunciation, info, period, and MYA 
  return `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${mya}.`;
}
// Added new variable 'mya' to hold the string representation of the dino's 🦖 "million years ago" time period. 
// Then I used an 'if' statement to check if the 'mya' array has only one value and assigned the corresponding string to 'mya'.
// Finally I used the 'mya' variable in the returned string instead of directly accessing the `mya` array. 

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  // Filter the dinos 🦖 based on whether they were alive during the specified time period (mya)
  const filtered = dinosaurs.filter(dinosaur => {
    // Get an array of mya values for the dino 🦖 
    const myaValues = dinosaur.mya;
    // If the array only contains one value, check ✅ if it's within one million years of the specified time period
    if (myaValues.length === 1) {
      const myaValue = myaValues[0];
      return myaValue === mya || myaValue === mya - 1;
    }
    // If the array contains multiple values, check if the specified time period is included in the range
    return myaValues.includes(mya);
  });

  // If a key is specified , return an array of values for that key from the filted dinos 🦖
  if (key) {
    return filtered.map(dinosaur => dinosaur[key] || dinosaur.id);
  }
  // If no key is specified, return an array of dinosaur 🦖 ids from the filtered dinosaurs 🦖.
  return filtered.map(dinosaur => dinosaur.id);
}


// Unfortunatley  
module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
