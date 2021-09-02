searchBook = () => {

    const searchField = document.getElementById("search-field");
    const bookCard = document.getElementById("book-card");
    const totalResult = document.getElementById("total-result");
    const nullInput = document.getElementById("no-input");
    const errorMessage = document.getElementById("invalid");

    const searchText = searchField.value;
    bookCard.textContent = '';
    totalResult.innerText = '';
    if (searchText === '') {
        spinner("hidden");
        nullInput.style.display = "block";
        errorMessage.style.display = "none";
        totalResult.innerText = '';
        bookCard.textContent = '';
    } else {
        spinner("visible");
        nullInput.style.display = "none";
        //  book search url
        const url = `https://openlibrary.org/search.json?q=${searchText}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                displayTotalFound(data);
            });
    }
    searchField.value = '';
};

displayTotalFound = (data) => {
    const totalResult = document.getElementById("total-result");
    totalResult.innerText = `Total ${data.numFound} results found. `;

    console.log("total-data", data);

    const errorMessage = document.getElementById("invalid");
    if (data.numFound === 0) {
        totalResult.innerText = '';
        errorMessage.style.display = "block";
        spinner("hidden");
    } else {
        errorMessage.style.display = "none";
        const bookCard = document.getElementById("book-card");

        data ?.docs.forEach((item) => {
            const div = document.createElement("div");
            console.log(item);
            //    image show part
            item ?.cover_i ?
                (imgUrl = `https://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`) :
                (imgUrl = "image/J5LVHEL.jpg");

            // author name
            item ?.author_name ? (authorName = item ?.author_name.join()) : (authorName = "not found");

            // publisher
            item ?.publisher[0] ? (publisher = item ?.publisher[0]) : (publisher = "not found");

            // first publish year
            item ?.publish_date[0] ? (publishDate = item ?.publish_date[0]) : (publishDate = "not found");

            console.log(item ?.title);

            div.innerHTML = `
         <div class="col">
             <div class="card p-3">
                  <img height='450px' src=${imgUrl}  class="card-img-top" alt="...">
                 <div class="card-body">
                     <h5 id="author" class="card-title">Book name: <span class ="text-danger"> ${item?.title} </span></h5>
                     <h6 class="card-text">Author:  <span class ="text-secondary"> ${authorName} </span></h6>
                     <h6 class="card-text">Publisher: <span class ="text-secondary"> ${publisher} </span> </h6>
                     <h6 class="card-text">First Published: <span class ="text-secondary">  ${publishDate
                     } </span> </h6>
  
                 </div>
             </div>
         </div>
         `;
            bookCard.appendChild(div);
            spinner("hidden");
        });
    }
};

// loading spinner part
spinner = (property) => {
    const spinner = document.getElementById("spinner");
    spinner.style.visibility = property;
};