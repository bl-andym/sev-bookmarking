
export default function BookmarkList({ bookmarks, remove} ) {

    return (
        <>
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
                <div className="col-10 pe-0">
                <button onClick={(e) => remove(e, bookmark.url)}className="float-end  border-0">X</button>
                    <div className="card-body">
                    <h5 className="card-title">{bookmark.title}</h5>
                    <p className="card-text">{bookmark.description}</p>                  
                    </div>
                </div>
                </div>
            ))}
        </>
    );
  }