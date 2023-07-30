// $(document).ready(function () {
//   $("#searchbox").click(function () {
//     console.log("clicked");
//     const div = document.getElementById("content-div");
//     const width = div.clientWidth;
//     const height = div.clientHeight + 150;
//     ipcRenderer.send("resize-me-please", { width, height });
//   });
// });

const myResizeBtn = document.getElementById("searchbox");
myResizeBtn.addEventListener("click", function () {
  // const div = document.getElementById("content-div");
  const width = 300;
  const height = 155;
  console.log("clicked");
  ipcRenderer.send("resize-me-please", { width, height });
});

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");

// if user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  let checkarray = [];
  let checkdata = true;
  if (userData) {
    checkarray = suggestions.map((data) => {
      if (data === undefined) {
        checkdata = false;
      }
    });

    if (checkdata) {
      emptyArray = suggestions.filter((data) => {
        //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
        return data
          .toLocaleLowerCase()
          .startsWith(userData.toLocaleLowerCase());
      });
      emptyArray = emptyArray.map((data) => {
        // passing return data inside li tag
        return (data = `<li>${data}</li>`);
      });
      searchWrapper.classList.add("active"); //show autocomplete box
      showSuggestions(emptyArray);
      let allList = suggBox.querySelectorAll("li");
      for (let i = 0; i < allList.length; i++) {
        //adding onclick attribute in all li tag
        // allList[i].setAttribute("onclick", "select(this)");
        const li = allList[i];
        li.onclick = function () {
          select(this);
        };
      }
    } else {
      searchWrapper.classList.add("active"); //show autocomplete box
      emptyArray.push('<li class="no-results">No results found</li>');
      showSuggestions(emptyArray);
    }
  } else {
    searchWrapper.classList.remove("active"); //hide autocomplete box
  }
};

inputBox.addEventListener("click", function () {
  const div = document.getElementById("autocom-div");
  const width = 300;
  const height = div.clientHeight + 155;
  div.innerHTML = "";
  div.style.display = "none";
  ipcRenderer.send("resize-me-please", { width, height });
});

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
 
  getKeySearch({
    keyword: `${selectData}`,
    domain: `${localStorage.getItem("domain")}`,
  }).then((response) => {
    response.json().then((resObj) => {
      addcontent(resObj); 
      console.log(resObj);
	  
	  ////changes by deval - 15/07, to record user click event BEGIN
	  let ID = localStorage.getItem("userID");
	  let obj = selectData;
	  let beURL = "https://api.spoolapp.co/adminPanel";
	  //alert(`${beURL}/putUserSearch/${ID}/${selectData}`);
	  //fetch(`${beURL}/putUserSearch/${ID}/${selectData}`);
	  return fetch(`${beURL}/putUserSearch/${ID}/${selectData}`, {
		method: "post",
		headers: {
		  "Content-Type": "application/json",
		},
	  });
	  ////changes by deval - 15/07, to record user click event END
  
    });
  });

  // const contentDi = document.querySelector(".content");
  // contentDiv.innerHTML = `You selected: ${selectData}`;

  // if (!selectData) {
  //   // If selectData is empty, set webLink and linkTag attributes to null
  //   webLink = null;
  //   linkTag.setAttribute("href", webLink);
  // } else {
  //   icon.onclick = () => {
  //     webLink = `https://www.google.com/search?q=${selectData}`;
  //     linkTag.setAttribute("href", webLink);
  //     linkTag.click();
  //   };
  // }
  searchWrapper.classList.remove("active");
}

function addcontent(res) {
  const values = res;

  const dataContainer = document.getElementById("content-div");

  if (dataContainer.innerHTML.trim() === "") {
  } else {
    dataContainer.innerHTML = "";
  }

  values.map((item, index) => {
    var button = document.createElement("button");
    button.className = "collapsible";
    button.textContent = item.sub_cat;
    button.style.backgroundColor = index % 2 !== 0 ? "black" : "#ffc905";
    button.style.color = index % 2 !== 0 ? "white" : "black";
    var content = document.createElement("div");
    content.className = "content";
    content.innerHTML = item.message;

    button.addEventListener("click", function () {
      this.classList.toggle("active");
      const div = document.querySelector("active");
      const width = 300;
      const height = 400;
      ipcRenderer.send("resize-me-please", { width, height });

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });

    dataContainer.appendChild(button);
    dataContainer.appendChild(content);
  });
  const div = document.getElementById("content-div");
  const width = 300;
  let height = div.clientHeight + 155;
  if (height > 400) {
    height = 400;
    div.style.overflowY = "auto";
  }
  ipcRenderer.send("resize-me-please", { width, height });
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    listData = '<li class="no-results">No results found</li>';
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;

  const div = document.getElementById("autocom-div");
  div.style.display = "block";
  const width = 300;
  const height = div.clientHeight + 155;
  ipcRenderer.send("resize-me-please", { width, height });
}

// const myResizeBtn = document.getElementById("resizeBtn");
// myResizeBtn.addEventListener("click", function () {
//   ipcRenderer.send("resize-me-please");
// });

function Editprofile() {
  window.location.href = "./Editprofile.html"; // Replace the URL with the desired destination
}

document.querySelector(".minimize").addEventListener("click", () => {
  ipcRenderer.send("minimize");
});

document.querySelector(".maximize").addEventListener("click", () => {
  ipcRenderer.send("maximize");
});

document.querySelector(".close").addEventListener("click", () => {
  ipcRenderer.send("close");
});

// -------------------------------------------------------------------

const clearButton = document.getElementById("clearbtn-data");

// Function to clear input data
function clearInput() {
  inputBox.value = "";
  const div = document.getElementById("autocom-div");
  div.innerHTML = "";
  div.style.display = "none";
}

// inputBox.addEventListener("click", function () {
//   const div = document.getElementById("autocom-div");
//   const width = 300;
//   const height = div.clientHeight + 155;
//   ipcRenderer.send("resize-me-please", { width, height });
// });

clearButton.addEventListener("click", clearInput);
