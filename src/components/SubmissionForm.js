import React from "react";

const SubmissionForm = (props) =>{
    return(
        <form onSubmit={props.submission}>
        <div>
          Title: <input value={props.titleField} onChange={props.titleInput}/>
        </div>
        <div>
          Author: <input value={props.authorField} onChange={props.authorInput}/>
        </div>
        <div>
          url: <input value={props.urlField} onChange={props.urlInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default SubmissionForm