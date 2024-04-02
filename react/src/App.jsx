import React, { useState } from "react";
import users from "./Users.jsx";
import bookData from "./Books.jsx";
import "./App.css";

function LibraryApp() {
  /*  Variable states
      current user variable states that change throughout the programs lifespan
  */
  const [books, setBooks] = useState(bookData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10); //# books per page

  //user variable states
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userMoney, setUserMoney] = useState(0);
  const [userBorrowedBooks, setUserBorrowedBooks] = useState({});

  //other states
  const [view, setView] = useState("welcome");
  const [error, setError] = useState("");

  //localStorage.clear();   //clear saved variables for testing

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

    const userData =
      JSON.parse(localStorage.getItem(username)) || users[username]; //if data exists in localstorage, retrieve that, default to user.jsx data
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

    //save updated data to local storage
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
    //grabs array of books filtered from all pages
    const filteredBooks = filterBooks();
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;

    //use the new indicies to get new filtered books for current page
    return filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  }

  function searchBox(event) {
    setSearchTerm(event.target.value);
  }

  function filterBooks() {
    //filter books by search term, return list of books that match
    return books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  /*** Rendering functions ***/

  function welcomePage() {
    return (
      <div>
        <h1>Welcome to the Library of Babel</h1>
        <button onClick={() => setView("login")}>Login</button>&nbsp;
        <button onClick={() => setView("register")}>Sign Up</button>
      </div>
    );
  }
  // &nbsp; is a space to separate buttons
  function loginPage() {
    //classes no longer needed
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
            type="text"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button>Login</button>
        </form>
        <button onClick={() => setView("welcome")}>Back</button>
        {error && <p>{error}</p>}
      </div>
    );
  }

  function registrationPage() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <input type="text" placeholder="New Username" />
          <input type="text" placeholder="New Password" />
          <button>Register</button>
        </form>
        <button onClick={() => setView("welcome")}>Back</button>
        {error && <p>{error}</p>}
      </div>
    );
  }

  //in comments, a list = array
  function pageButtons() {
    //calculate # of pages needed for list of filtered books
    const numberOfPages = Math.ceil(filterBooks().length / booksPerPage);
    let pageNumbers = []; //array of page numbers
    for (let i = 1; i <= numberOfPages; i++) {
      pageNumbers.push(i);
    }

    let buttons = []; //array of buttons for the pages
    for (let i = 0; i < pageNumbers.length; i++) {
      const button = (
        <button
          key={pageNumbers[i]}
          onClick={() => setCurrentPage(pageNumbers[i])}
          style={{
            //hovering over the button for the page you are on prevents it from darkening
            backgroundColor: currentPage === pageNumbers[i] ? "#0090c9" : "",
          }}
        >
          {pageNumbers[i]}
        </button>
      );
      buttons.push(button);
      buttons.push(" "); //creates space between page buttons
    }

    return buttons;
  }

  function borrowedBooksPage() {
    return (
      <div>
        <h2>Your Borrowed Books</h2>
        <table>
          <thead>
            <tr>
              <th className="column200px">Title</th>
              <th className="column150px">Return</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(userBorrowedBooks).map((bookId) => (
              <tr key={bookId}>
                <td className="column200px">
                  {userBorrowedBooks[bookId].title}
                </td>
                <td className="column150px">
                  <button onClick={() => returnBook(bookId)}>Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setView("app")}>Back to Library</button>
      </div>
    );
  }

  function renderApp() {
    const currentBooks = getCurrentBooks();
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        <p>Your balance: ${userMoney}</p>
        <button onClick={logoutUser}>Logout</button>&nbsp;
        <button
          style={{ backgroundColor: "#4caf50" }}
          onClick={() => setView("borrowed")}
        >
          Borrowed Books
        </button>
        <input type="text" placeholder="Search..." onChange={searchBox} />
        <div style={{ float: "right" }}>
          <label htmlFor="booksPerPage">Books per page: </label>
          <select
            id="booksPerPage"
            value={booksPerPage}
            onChange={(event) => setBooksPerPage(Number(event.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>{pageButtons()}</div>
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
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td className="column200px">{book.title}</td>
                <td className="column500px">{book.description}</td>
                <td className="column150px">{book.genre}</td>
                <td className="column100px">${book.price}</td>
                <td className="column150px">
                  {!userBorrowedBooks[book.id] && (
                    <button onClick={() => borrowBook(book)}>Borrow</button>
                  ) /*in case of any bug that shows borrowed books here*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  //errors not showing
  function pages() {
    if (view === "welcome") {return welcomePage();}
    if (view === "login") {return loginPage();}
    if (view === "register") {return registrationPage();}
    if (loggedIn === true && view === "app") {return renderApp();}
    if (loggedIn === true && view === "borrowed") {return borrowedBooksPage();}
    return welcomePage();
  }

  return <div>{pages()}</div>; //LibraryApp() return statement
}

export default LibraryApp;