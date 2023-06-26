
export default function HabitFormPage(props){
    return (
        <>
        <div>HabitFormPage</div>
        <div className="col-10 col-md-8 col-lg-7">
      {/* {error && <ErrorAlert details={"Failed to save the content"} />} */}
      <form /*onSubmit={/*handleSubmit}*/>
        <div className="input-group">
          <input
            type="text"
            placeholder="Add your words of wisdom here..."
            // value={'content'}
            className="form-control"
            // onChange={'handleContentChange'}
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Save Post
          </button>
        </div>
      </form>
    </div>
        </>
    )
};