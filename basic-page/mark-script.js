// Script for generating interactive search boxes from Mark's data

var data, cat, subcat; // initialise global variables

$(document).ready(function() { // wait for document object to be ready before executing

  // Function for fetching data
  var request = $.getJSON("Mark_final.json", function(success) { // get data
    data = success.entries; // when ready, create array of entries
    getCategories(data) // pass to next function
  })

  // Function to get list of first-level categories
  var getCategories = function(data) {
    var allcats = []
    data.forEach(function(element) { // get all top-level categories
      allcats.push(element.category["1"]);
    })
    cat = new Set(allcats);
    getSubCats(cat) // pass to next function
  }

  // Function to create object
  var getSubCats = function(cat) {
    subcat = [];
    cat.forEach(function(category) { // Loop through categories
      subcat.push({"cat1":category}) // Create object in array for each one
    })
    subcat.forEach(function(category) { // Loop through new array
      var cat2 = []; // initialise array of subcategories
      data.forEach(function(entry) { // loop through data
        if (entry.category["1"] == category.cat1) { // if the entry is in this cat...
          cat2.push(entry.category["2"]) // ... add it to the array
        }
      })
      category.cat2 = cat2;
    })
    createMenu(subcat) // pass to next function
  }

  // Function for generating menu
  var createMenu = function(subcat) {
      // Create div for each category
      subcat.forEach(function(element){
        var node = document.createElement("div");
        var textnode = document.createTextNode(element.cat1);
        node.setAttribute("class", "cat1button");
        node.setAttribute("id",element.cat1);
        node.appendChild(textnode);
        document.getElementById("search-boxes").appendChild(node).addEventListener("click", menuButton);
      }
    )
  }

  var menuButton = function() {
    var element = this; // get category element
    var button_element = this.textContent;
    var result = subcat.filter(obj => {
      return obj.cat1 === element.textContent;
    })
    // Get unique values of cat2 for result
    unique = new Set(result[0].cat2);
    console.log(unique);
    element.innerHTML = null; // clear div
    element.setAttribute("id", button_element + "list");
    element.setAttribute("class", "cat2list")
    unique.forEach(function(x){ // loop through the unique subcategories
      console.log(x)
      var div = document.createElement("div");
      var anchor = document.createElement("a");
      var textnode = document.createTextNode(x);
      anchor.appendChild(textnode);
      anchor.setAttribute("href", "results.html?id=" + x); // send user to results page when they click
      div.setAttribute("class", "cat2result");
      div.appendChild(anchor);
      document.getElementById(button_element + "list").appendChild(div);
    })
  }

});
