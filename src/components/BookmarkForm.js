import { useState } from "react";

const apiUrl = "https://opengraph.io/api/1.1/site";
const appId = "a30b822f-a905-47d2-aaf2-ee2f64f1b6b1";

export default function BookmarkForm({ bookmarks, setBookmarks }) {
    const [url, setUrl] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsProcessing(true);
        const encodeUrl = encodeURIComponent(url);
    
        // fetch opengraph url
        fetch(`${apiUrl}/${encodeUrl}?app_id=${appId}`)
          .then((res) => res.json())
          .then((data) => {
            // Finds an existing bookmark in the bookmarks array 
            // with the same URL as the one returned from the API.
            // Returns found bookmark, if no matching bookmark is found, 
            // returns undefined.
            const existingBookmark = bookmarks.find((bookmark) => bookmark.url === data.hybridGraph.url);
    
            if (!existingBookmark) {
              const newBookmark = {
                title: data.hybridGraph.title,
                image: data.hybridGraph.image,
                url: data.hybridGraph.url,
                description: data.hybridGraph.description
              };
              // add a bookmark to bookmarks state variable
              // spread previous b'mrks and add new b'mrk into
              setBookmarks([...bookmarks, newBookmark]);
            } 
            setIsProcessing(false);
            setUrl('');
        });
    }

    return (
        <form className="input-group p-0" onSubmit={handleSubmit}>
            {/** form URL input field and add btn (e.target.value retrieves current input value) */}
            <input
                className="form-control"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button className="btn btn-primary" disabled={isProcessing} type="submit">
                Add
            </button>
        </form>
    );
}