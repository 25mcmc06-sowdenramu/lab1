$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "books.xml",
        dataType: "xml",
        success: function(xml) {
            var jsonData = [];
            $(xml).find("book").each(function() {
                var book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publication_date: $(this).find("publication_date").text()
                };
                jsonData.push(book);
            });

            // Populate author filter
            var authors = [...new Set(jsonData.map(book => book.author))];
            authors.forEach(author => {
                $("#author-filter").append(`<option value="${author}">${author}</option>`);
            });

            // Display books
            displayBooks(jsonData);

            // Apply filters
            $("#apply-filters").click(function() {
                var genre = $("#genre-filter").val();
                var author = $("#author-filter").val();
                var priceMin = parseFloat($("#price-min").val()) || 0;
                var priceMax = parseFloat($("#price-max").val()) || Infinity;
                var filteredData = jsonData.filter(book => {
                    return (genre === "" || book.genre === genre) &&
                           (author === "" || book.author === author) &&
                           book.price >= priceMin && book.price <= priceMax;
                });
                displayBooks(filteredData);
            });
        }
    });

    function displayBooks(books) {
        $("#book-table-body").empty();
        books.forEach(book => {
            $("#book-table-body").append(`
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>$${book.price.to.strftime("%.2f")}</td>
                    <td>${book.publication_date}</td>
                </tr>
            `);
        });
    }
});