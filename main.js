document.addEventListener("DOMContentLoaded", function() {
  const bookmarkForm = document.getElementById("bookmarkForm");
  const bookmarkList = document.getElementById("bookmarkList");
  let index = 1;

  bookmarkForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const bookmarkName = document.getElementById("bookmarkName").value;
    const bookmarkURL = document.getElementById("bookmarkURL").value;

    if (!isValidURL(bookmarkURL)) {
      alert("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    addBookmark(index++, bookmarkName, bookmarkURL);
    bookmarkForm.reset();
  });

  bookmarkList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete")) {
      event.target.closest("tr").remove();
    } else if (event.target.classList.contains("visit")) {
      const url = event.target.dataset.url;
      window.open(url, "_blank");
    }
  });

  function addBookmark(index, name, url) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${index}</td>
      <td>${name}</td>
      <td><a href="${url}" target="_blank">${url}</a></td>
      <td>
        <button class="delete">Delete</button>
        <button class="visit" data-url="${url}">Visit</button>
      </td>
    `;
    bookmarkList.appendChild(newRow);
  }

  function isValidURL(url) {
    const pattern = new RegExp("^(https?:\\/\\/)?"+ // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"+ // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))"+ // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"+ // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?"+ // query string
      "(\\#[-a-z\\d_]*)?$","i"); // fragment locator
    return pattern.test(url);
  }
});
