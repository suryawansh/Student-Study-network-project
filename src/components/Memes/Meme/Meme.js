import React from 'react';

const Meme = ({name, caption, postedOn, memeImage}) => {
    return (
        <div class="meme" onClick={()=>{window.open('http://localhost:8080/'+memeImage)}}>                        
            <div class="heading">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg" alt="profile-pic" />
                <div>
                    <h4>{name}</h4>
                    <p>Posted On: {postedOn}</p>
                </div>
            </div>
            <p className="m-2">{caption}</p>
            <img class="meme-image" src={`http://localhost:8080/`+memeImage} alt="meme" />
            {/* <div class="interactions">
                <div class="interaction">
                    <img src="images/like.png" alt="like" />
                    <p>Like</p>
                </div>
                <div class="interaction">
                    <img src="images/comment.png" alt="comment" />
                    <p>Comment</p>
                </div>
                <div class="interaction">
                    <img src="images/share.png" alt="share" />
                    <p>Share</p>
                </div>
            </div> */}
        </div> 
    )
}

export default Meme;