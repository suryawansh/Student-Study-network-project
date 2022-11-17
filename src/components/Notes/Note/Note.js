import React from 'react';

const Note = ({caption, name, postedOn,note}) => {
    return (
        <div class="note"  onClick={()=>window.open(`http://localhost:8080/${note}`)}>
            <div class="heading">
                <div class="heading-info">
                    <h3>{caption} (By {name})</h3>
                    <p>{postedOn}</p>
                </div>
                <img src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg" alt="Dwayne Rock" />
            </div>
            {note.split('.')[note.split('.').length-1]==='pdf'?<embed src={`http://localhost:8080/${note}`} width="100%" height="250px" onClick={()=>{console.log("Hiii");window.open(`http://localhost:8080/${note}`)}} />
                :<img src={`http://localhost:8080/${note}`} width="100%" height="250px" onClick={()=>window.open(`http://localhost:8080/${note}`)} />}

            <p style={{height:1, visibility:'hidden'}}>h</p>
        </div>
    )
}

export default Note;