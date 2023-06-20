import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
const apiUrl = "https://opengraph.io/api/1.1/site";
const appId = "a30b822f-a905-47d2-aaf2-ee2f64f1b6b1";

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState("");

  // on mount retrieve locaStorage bookmarks
  useEffect(() => {
    const lsBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(lsBookmarks);
  }, []);

  // store new bookmarks to localStorage whenever they change
  // useEffect(() => {
  //    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  // }, [bookmarks]);

  function handleSubmit(e) {
    e.preventDefault();
    const encodeUrl = encodeURIComponent(url);

    // fetch opengraph url
    fetch(`${apiUrl}/${encodeUrl}?app_id=${appId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const newBookmark = {
          title: data.hybridGraph.title,
          image: data.hybridGraph.image,
          url: data.hybridGraph.url,
          description: data.hybridGraph.description
        };

        const newBookmarks = [...bookmarks, newBookmark];

        // add a bookmark to bookmarks state variable
        // spread previous b'mrks and add new b'mrk into newBookmarks
        setBookmarks(newBookmarks);

        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      });
  }
  return (
    <>
      <div className="p-3">
        {/** form URL input field and add btn */}
        <div className="container mt-3">
          {/** form (e.target.value retrieves current input value) */}
          <form className="input-group p-0" onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="btn btn-secondary" type="submit">
              Add
            </button>
          </form>
        </div>

        {/** list */}
        <div className="container">
          {bookmarks.map((bookmark, index) => (
            <div key={index} className="row bg-light mt-3 border p-2">
              <div className="col-2 p-0">
                <a
                  href={bookmark.url}
                  className=""
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="img-fluid"
                    src={bookmark.image}
                    alt="bookmark title"
                  />
                </a>
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-title">{bookmark.title}</h5>
                  <p className="card-text">{bookmark.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
