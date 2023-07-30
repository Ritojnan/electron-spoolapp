////changes by deval - 11/07, to check if user is valid n get its ID BEGIN

let validateUser = (email)  => {
 
  let beURL = "https://api.spoolapp.co/adminPanel";
  //alert(email);
  return fetch(`${beURL}/getIDfromEmail/${email}`); 
}
////changes by deval - 11/07, to check if user is valid n get its ID END

// Function to validate email format
function validateEmail(email) {
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

// Function to extract domain from email
function extractDomain(email) {
  var atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.substring(atIndex + 1);
  }
  return "";
}

// Function to navigate to another page
function navigateToPage() {
  // Get the entered email value
  var emailInput = document.getElementById("Emailvalue");
  var email = emailInput.value.trim();

  // Validate the email
  if (validateEmail(email)) {
    // Extract the domain from the email
    var domain = extractDomain(email);

    // Check if the domain is present in the array
    var domainsArray = [
      "gmail.com",
      "outlook.com",
      "reddit.com",
      "reddifmail.com",
      "redifmail.com",
      "rediffmail.com",
      "zoho.com",
      "yandex.com",
      "icloud.com",
      "proton.com",
      "aol.com",
      "yahooo.com",
      "youtube.com",
      "instagram.com",
      "facebook.com",
      "amazon.com",
    ]; // Replace with your array of domains
    var isInArray = domainsArray.includes(domain);

    if (isInArray) {
      // Domain is present in the array, do not navigate
      var domainError = document.getElementById("domainError");
      domainError.style.display = "block";
      document.querySelector(".UserLogin").style.marginTop = "30px";
    } else {
		
		  ////Below original 3 lines commenteed and 
		  ////added below if-else - DEVAL
		  //localStorage.setItem("userEmail", email); // Add email value to localStorage
		  //localStorage.setItem("domain", domain); // Add domain value to localStorage
		  //window.location.href = "./homepage.html"; // Replace "homepage.html" with the
		 
		 ////changes by deval - 11/07, to check if user is valid n get its ID BEGIN
		  var userID="-1";
		  //validateUser("ross.brown@pleo.io");
		  validateUser(email).then((response) => {
			//alert(userID);
			//alert(response);
			response.json().then((resObj) => {  										  
				//alert(resObj); ////- PLEASE NOTE, alter causes screen to freeze
				if(resObj == "-1") {				   
				// Show email validation error
				var emailError = document.getElementById("emailError");
				emailError.style.display = "block";
				const width = 300;
				const height = 350;
				ipcRenderer.send("resize-me-please", { width, height });
			  }
			  else {				  
				  userID = resObj.id;
				  localStorage.setItem("userEmail", email); // Add email value to localStorage
				  localStorage.setItem("domain", domain); // Add domain value to localStorage
				  localStorage.setItem("userID", userID);				  
					//store.set('domain', domain);
					//store.set('userID', userID);
					//console.log(store.get('domain'));
					//ipcRenderer.send("addStore", { domain, userID });
				  window.location.href = "./homepage.html";
			  }
			});
		  });
		  ////changes by deval - 11/07, to check if user is valid n get its ID END
    }
  } else {
    // Show email validation error
    var emailError = document.getElementById("emailError");
    emailError.style.display = "block";
    const width = 300;
    const height = 350;
    ipcRenderer.send("resize-me-please", { width, height });
  }

  // Display domain error if necessary
  var selectedDomain = document.getElementById("selectedDomain");
  selectedDomain.textContent = extractDomain(email); // Update the selected domain span

  if (selectedDomain.textContent === "") {
    var domainError = document.getElementById("domainError");
    domainError.style.display = "block";
  }
}

// Add event listener to signup button
var signupButton = document.getElementById("signup");
signupButton.addEventListener("click", navigateToPage);

function goBack() {
  window.location.href = "./homepage.html"; // Replace "homepage.html" with the desired page URL
}

// var deletebtn = document.getElementById("delete");
// deletebtn.addEventListener("click", deleteev);

// function deleteev() {
//   localStorage.setItem("userEmail", "");
//   localStorage.setItem("domain", "");
// }

document.querySelector(".minimize").addEventListener("click", () => {
  ipcRenderer.send("minimize");
});

document.querySelector(".maximize").addEventListener("click", () => {
  ipcRenderer.send("maximize");
});

document.querySelector(".close").addEventListener("click", () => {
  ipcRenderer.send("close");
});
