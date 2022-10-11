const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    getAndDisplayApiHtml(searchInput.value);
  }
});

function setUpAnimation() {
  Array.from(document.getElementsByClassName("my-api")).forEach((element) => {
    element.style.animationName = "showUp";
    element.style.animationDuration = "1s";
  });
}
async function getAndDisplayApiHtml(category) {
  let response = await fetch(
    `https://api.publicapis.org/entries?category=${category}`
  );
  let data = await response.json();
  displayAPIs(data);
}

function getAPIhtml(myAPI) {
  let myApiHtml = `
        <div class="my-api">
            <div class="my-api-name">
                <a href="${myAPI.Link}">API Name: ${myAPI.API} (${
    myAPI.Category
  })</a>
            </div>
            <div class="my-api-description"><span class="accent-bold">Description:</span> ${
              myAPI.Description
            }</div>
            <div class="my-api-auth ${
              myAPI.Auth == "" ? "not-supported" : "supported"
            }"><span class="accent-bold"> Auth Type:</span> ${
    myAPI.Auth === "" ? "none" : myAPI.Auth
  }</div>
            <div class="my-api-https ${
              myAPI.HTTPS ? "supported" : "not-supported"
            }">${
    myAPI.HTTPS === true ? "Supports HTTPS" : "Does not support HTTPS"
  }</div>
        </div>
        `;
  return myApiHtml;
}

function displayAPIs(myAPIs) {
  const apiEntries = myAPIs.entries;
  if (apiEntries !== null) {
    let allApisHtml = apiEntries
      .map((api) => {
        return getAPIhtml(api);
      })
      .join("");

    document.getElementsByTagName("main")[0].innerHTML = allApisHtml;
    setUpAnimation();
  } else {
    noResultHtml = `<div class="my-api">
    <div class="my-api-name">
        <a href="#">No API found for this requested category</a>
    </div>
</div>`;
    document.getElementsByTagName("main")[0].innerHTML = noResultHtml;
    setUpAnimation();
  }
}
