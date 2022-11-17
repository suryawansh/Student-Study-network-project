
import React, {useEffect, useState} from 'react';
import {Modal, ModalDialog, ModalTitle, ModalBody, ModalFooter, Button} from 'react-bootstrap';
import Meme from './Meme/Meme';
import './Memes.css';

const Memes = (props) => {
    
    const [show, setShow] = useState(false);
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState();
    const [memes, setMemes] = useState([]);

    const handleShow = () => {setShow(true)}
    const handleHide = () => {setShow(false)}
    
    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    }

    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);        
    }

    const handleMeme = () => {
        
    }

    const handleAddMeme = (e) =>{        
        setShow(false);
        if(file){
            const formData = new FormData();
            formData.append('caption', caption);
            formData.append('file', file);
            formData.append('id', localStorage.getItem('email'))
            console.log(formData);
            fetch('http://localhost:8080/meme', {
                method:"POST",
                
                body:formData
                
            }).then(res=> res.json()).catch(err=>console.log(err))
            .then(body=>{
                console.log(body)
            }).catch(err=>console.log(err));
        }
    }

    useEffect( async() => {
        const data = await fetch("http://localhost:8080/meme");
        const res = await data.json();
        console.log(res);
        setMemes(res.data);
        handleMeme();
    }, [])

    return (
        <>
            <Modal show={show} centered>
                <ModalDialog>
                    <ModalTitle>
                        Add Your Own Meme
                    </ModalTitle>
                </ModalDialog>

                <ModalBody>
                    <form onSubmit={handleAddMeme}>
                        <input type="text" value={caption} onChange={handleCaptionChange} placeholder="Enter Caption" className="w-100 m-2" />
                        <input type="file" name="file" onChange={handleFileChange} className="w-100 m-2" />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleHide} variant="danger">Cancel</Button>
                    <Button onClick={handleAddMeme} type="submit">Add Meme</Button>
                </ModalFooter>
            </Modal>
            <header class="header">
            <nav class="nav">
                <a>Home</a>
                <ul>
                    <li><a onClick={() => { props.setPage("Home") }}>Memes</a></li>
                    <li><a onClick={() => { props.setPage("Notes") }}>Notes</a></li>
                    <li><a onClick={() => { props.setPage("Subject") }}>Subjects</a></li>
                    <li><a onClick={() => { localStorage.removeItem('email'); props.handleLogin(false); }}>Log Out</a></li>
                </ul>
            </nav>
            </header>
            <section class="meme-section">
                <Button onClick={handleShow} variant="warning" style={{position:"fixed", right:0, bottom:0}} className="m-4">Add Meme</Button>
                <div class="profile">
                    
                </div>
                <div class="memes">
                    {memes.map((meme) => <Meme name={meme.name} postedOn={meme.posted_on} caption={meme.caption} memeImage={meme.meme} />)}
                </div>
                <div class="chat"></div>
            </section> 
        </>
    );
}

export default Memes;