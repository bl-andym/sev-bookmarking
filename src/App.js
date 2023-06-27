import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import BookmarkList from "./components/BookmarkList";
import BookmarkForm from "./components/BookmarkForm";

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);

  // on mount retrieve localStorage bookmarks
  useEffect(() => {
    const lsBookmarks = JSON.parse(localStorage.getItem("bookmarks")); //|| [];
    // if lsBookmarks is not falsey and 
    // has a length greater than 0.
    if (lsBookmarks && lsBookmarks.length > 0) {
      setBookmarks(lsBookmarks);
    }
  }, []);

  // store new bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  function removeBookmark(e, url) {
    e.preventDefault();
    /**
     * Execute CB function for each elem in bookmarks array.
     * Compares each bookmark url with the current url.
     * If bookmark url not equal to current url return true 
     * and include in filtered array, if false don't include.
     * filtered is a new array with excluded bookmarks.
     */
    const filtered = bookmarks.filter((bookmark) => {
      return bookmark.url !== url;
    })

    setBookmarks(filtered);

  }

  return (
    <>
      <div className="p-3">
        <div className="container mt-3">
          <BookmarkForm bookmarks={bookmarks} setBookmarks={setBookmarks} />
        </div>

        <div className="container">
          <BookmarkList bookmarks={bookmarks} remove={removeBookmark} />
        </div>
      </div>
    </>
  );
}
