import React, { useState } from "react";
import users from "./Users.jsx";
import bookData from "./Books.jsx";

function LibraryApp() {
  /*  Variable states
      current user variable states that change throughout the programs lifespan
  */
  const [books, setBooks] = useState(bookData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10); //# books per page

  //user variable states
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userMoney, setUserMoney] = useState(0);
  const [userBorrowedBooks, setUserBorrowedBooks] = useState({});

  //other states
  const [view, setView] = useState("welcome");
  const [error, setError] = useState("");

  //localStorage.clear();   //testing

  function registerUser(event) {
    event.preventDefault();
    //registration can be implemented here
  }

  function loginUser(event) {
    event.preventDefault(); //prevents page reloading
    if (users[username] === false) {
      setError("Username does not exist");
      return;
    }

    if (users[username].password !== password) {
      setError("Invalid password");
      return;
    }

    const userData = JSON.parse(localStorage.getItem(username)) || users[username]; //if data exists in localstorage, retrieve that, default to user.jsx data
    setLoggedIn(true);
    setUserMoney(userData.money);

    setUserBorrowedBooks(userData.borrowedBooks || {}); //sets to currently borrowed books or none
    setError("");
    setView("app"); //go to library page
  }

  function logoutUser() {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setCurrentPage(1);
    setUserBorrowedBooks({});
    setError("");
    setView("welcome");
  }

  function borrowBook(book) {
    if (userMoney < book.price) {
      setError("Not enough money to borrow this book");
      return;
    }
    

    const updatedMoney = userMoney - book.price;
    const updatedBorrowedBooks = { ...userBorrowedBooks, [book.id]: book };

    setUserMoney(updatedMoney);
    setUserBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem(
      //save updated user data to local storage
      username,
      JSON.stringify({
        ...users[username],
        money: updatedMoney,
        borrowedBooks: updatedBorrowedBooks,
      })
    );
    setBooks(books.filter((temp) => temp.id !== book.id)); //update book list
  }

  function returnBook(bookId) {
    const book = userBorrowedBooks[bookId];
    const updatedUserBorrowedBooks = { ...userBorrowedBooks };
    delete updatedUserBorrowedBooks[bookId];
    setUserBorrowedBooks(updatedUserBorrowedBooks);

    //save updates data to local storage
    localStorage.setItem(
      username,
      JSON.stringify({
        ...users[username],
        borrowedBooks: updatedUserBorrowedBooks,
      })
    );
    setBooks([...books, book]); //add book back to the list
  }

  function getCurrentBooks() {
    //returns books on current page
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    return books.slice(indexOfFirstBook, indexOfLastBook);
  }

  function searchBox(event) {
    setSearchTerm(event.target.value);
  }

  function filterBooks() {
    //filter books by search term, return list of books that match
    const currentBooks = getCurrentBooks();
    const filteredBooks = currentBooks.filter((book) => {
      //return true if any search terms match a title, genre, or description
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    return filteredBooks;
  }

  function welcomePage() {
    return (
      <div>
        <h1>Welcome to the Library of Babel</h1>
        <button onClick={() => setView("login")}>Login</button>
        <button onClick={() => setView("register")}>Sign Up</button>
      </div>
    );
  }

  function loginPage() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={() => setView("welcome")}>Back</button>
        {error && <p>{error}</p>}
      </div> //show error message if there is one
    );
  }

  function registrationPage() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <input
            type="text"
            placeholder="New Username"
            onChange={(event) => setNewUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            onChange={(event) => setNewUserPassword(event.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <button onClick={() => setView("welcome")}>Back</button>
        {error && <p>{error}</p>}
      </div>
    );
  }

  function pageButtons() {
    const numberOfPages = Math.ceil(books.length / booksPerPage);

    let pageNumbers = []; //array to hold page numbers

    //get all needed page numbers
    for (let i = 1; i <= numberOfPages; i++) {
      pageNumbers.push(i);
    }

    //array to hold displayed buttons
    let buttons = [];

    //create a UI button for each page
    for (let i = 0; i < pageNumbers.length; i++) {
      const button = (
        <button
          key={pageNumbers[i]}
          onClick={() => setCurrentPage(pageNumbers[i])}
        >
          {pageNumbers[i]}
        </button>
      );
      buttons.push(button);
    }

    return buttons;
  }

  function renderApp() {
    const filteredBooks = filterBooks();
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        <p>Your balance: ${userMoney}</p>
        <button onClick={logoutUser}>Logout</button>
        <input type="text" placeholder="Search..." onChange={searchBox} />

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.genre}</td>
                <td>${book.price}</td>
                <td>
                  {!userBorrowedBooks[book.id] && (
                    <button onClick={() => borrowBook(book)}>Borrow</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>{pageButtons()}</div>

        <h2>Borrowed Books</h2>
        <ul>
          {Object.keys(userBorrowedBooks).map((bookId) => (
            <li key={bookId}>
              {userBorrowedBooks[bookId].title} -
              <button onClick={() => returnBook(bookId)}>Return</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function pages() {
    if (view === "welcome") {return welcomePage();}
    if (view === "login") {return loginPage();}
    if (view === "register") {return registrationPage();}
    if (loggedIn === true && view === "app") {return renderApp();
    } else {return welcomePage();}
  }

  return <div>{pages()}</div>; //LibraryApp() return
}

export default LibraryApp;


