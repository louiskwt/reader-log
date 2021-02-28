// book class
class Book {
    constructor(title, author, date, rating) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.rating = rating;
    }
}

let counter = 1;

// UI class
class UI {
    // add book to the table
    addBookToTable(book) {
        const table = document.querySelector('#book-table');

        // create table row
        const row = document.createElement('tr');

        const rowNumber = document.querySelectorAll('tr').length;
        let star = '';
        // create star
        for(let i = 1; i <= book.rating; i++) {
            star += '<i class="fas fa-star"></i>';
        }

        // create table data
        row.innerHTML = `
                        <th scope="row">${counter}</th>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.date}</td>
                        <td>${star}</td>
                        <td><i class="fas fa-trash delete" style="cursor: pointer"></i></td>
                        `;
        table.appendChild(row);
        counter++;
        }
    // delete book
    deleteBook(target) {
        if(target.classList.contains("delete")) {
            target.parentElement.parentElement.remove();
        }
        counter--;
    }
    // clear fields
    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#date').value = '';
        document.querySelector('#rating').value = '';
    }
    showAlert(message, className) {
        // create alert div
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;

        div.appendChild(document.createTextNode(message));

        // get container
        const container = document.querySelector('.container');
        // get form row
        const formRow = document.querySelector('#form-row');
        // insert alert
        container.insertBefore(div, formRow);
        
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000)
    }
}

// Event listener
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const date = document.querySelector('#date').value;
    const rating = document.querySelector('#rating').value;
    // instantiate a new book and its UI
    const book = new Book(title, author, date, rating);
    const ui = new UI();

    // validate input
    if(title === '' || author === '' || date === '' || rating === 'Click me to rate') {
        ui.showAlert('Please fill in all fields', 'danger');
    } else {
        // Add book to table
        ui.addBookToTable(book);
        // show success message
        ui.showAlert("Book added", 'success');
        // clear fields after submit
        ui.clearFields();
    }
})

// Event listener for delete
document.querySelector('#book-table').addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Successfully deleted', 'success');
})