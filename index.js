let listItemCounter = 0;
const createListItem = itemText => {
  // generate ids like 'item1', 'item2', ...
  listItemCounter++;
  const itemId = "item" + listItemCounter;

  // create container <div class="listItem"/>
  const listItem = document.createElement("div");
  listItem.setAttribute("class", "listItem");

  // <input id="item1" type="checkbox" class="checkbox" />
  const checkbox = document.createElement("input");
  checkbox.setAttribute("id", itemId);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  listItem.appendChild(checkbox);

  // <label for="item1" class="label">Some label</label>
  const label = document.createElement("label");
  label.setAttribute("for", itemId);
  label.setAttribute("class", "label");
  label.innerText = itemText;
  listItem.appendChild(label);

  //close button next to each list item, which hides it when clicked
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  listItem.appendChild(span);

  span.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  };

  return listItem;
};

const createList = () => {
  // Get section name
  const sectionInput = document.querySelector("#sectionText");
  const listName = sectionInput.value; // get list name from input
  sectionInput.value = ""; // clear input

  // List
  const section = document.createElement("section");
  section.setAttribute("id", 1);

  // List title
  const h3 = document.createElement("h3");
  if (listName === "") {
    h3.innerText = "New List";
  } else {
    h3.innerText = listName;
  }

  h3.setAttribute("class", "header");
  h3.style.marginBottom = "16px";
  const bckgrndColor = getRandomColor();
  h3.style.backgroundColor = bckgrndColor;
  h3.style.color = getContrast(bckgrndColor);

  //close button for each form
  const spanList = document.createElement("SPAN");
  const txtList = document.createTextNode("\u00D7");
  spanList.className = "close";
  spanList.appendChild(txtList);
  spanList.style.display = "flex";
  section.appendChild(spanList);

  spanList.onclick = function() {
    section.style.display = "none";
  };

  // New item input
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Item...");

  // Create a callback, whhich adds new item
  const addNewItem = e => {
    e.preventDefault(); // do not actually submit form
    const itemText = input.value;
    input.value = ""; // clear input
    const newItem = createListItem(itemText); // create new item
    section.appendChild(newItem); // append to list
  };

  // New item button
  const btn = document.createElement("button");
  btn.innerText = "Add item";
  btn.setAttribute("class", "button");
  btn.onclick = addNewItem;
  section.appendChild(btn);

  // Share list button
  const btn_share = document.createElement("button");
  btn_share.innerText = "Share";
  btn_share.setAttribute("class", "button");
  section.appendChild(btn_share);
  const modal = document.getElementById("shareModal");
  const span = document.getElementsByClassName("close")[0];
  btn_share.addEventListener("click", function(event) {
    event.preventDefault();
    modal.style.display = "block";
    //var currentListToShare = listItemCounter;
  });
  span.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  //submit button pressed
  const submitBtn = document.getElementById("submitButton");
  submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const emails = [...document.querySelectorAll(".chip")]
      .filter(item => item.style.display !== "none")
      .map(elem => elem.querySelector("span").textContent);
    modal.style.display = "none";
    console.log("List was sent to " + emails);
  });

  // New item form
  const form = document.createElement("form");
  form.onsubmit = addNewItem;
  form.setAttribute("class", "new-item-form");
  form.appendChild(input);
  form.appendChild(btn);
  form.appendChild(btn_share);

  section.appendChild(h3);
  section.appendChild(spanList);
  section.appendChild(form);

  // Create new item
  return section;
};

const newListForm = document.querySelector(".new-list-form"); // 'New list' button
const container = document.querySelector("#wrapper"); // app wrapper

newListForm.onsubmit = e => {
  try {
    e.preventDefault();
    const section = createList();
    container.appendChild(section);
  } catch (e) {
    alert(e.message);
  }
};

// helper function
const getRandomColor = () => {
  const colors = [
    "8c191e", //red brown
    "e3b110", //golden rod
    "96712a", //sienna
    "86b0a4", //dark sea green
    "e0ccab" //wheat
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const color = colors[randomIndex];
  return "#" + color;
};

const getContrast = hexcolor => {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  // Convert to RGB value
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? "#36251a" : "#fdebb4"; //dark late gray, mocassin
};

//sidenav
const menuBtn = document.querySelector("#menuBtn");
const sideNav = document.querySelector("#menuSidenav");
const hideNavBtn = document.querySelector("#closeNavBtn");

const openNav = () => {
  sideNav.classList.add("show");
};

const closeNav = () => {
  sideNav.classList.remove("show");
};

hideNavBtn.onclick = closeNav;
menuBtn.onclick = openNav;
