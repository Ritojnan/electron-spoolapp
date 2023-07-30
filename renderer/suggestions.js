const pythonBackendIURL = "https://nlp.spoolapp.co";
const existingDomain = localStorage.getItem("domain");

let suggestions = [];

let fetchKeyword = async (obj) => {
  try {
    const response = await fetch(`${pythonBackendIURL}/getKeywords`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json(); // Parse the response body as JSON
    return data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

fetchKeyword({ companyDomain: `${existingDomain}` })
  .then((resObj) => {
    suggestions = suggestions.concat(resObj.data.keyword);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("Error fetching data:", error);
  });

console.log(suggestions);

if (suggestions.length === 0) {
  console.log("suggestion array empty");
}
