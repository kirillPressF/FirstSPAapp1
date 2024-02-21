import { useEffect, useState } from 'react';
import { Link, json } from "react-router-dom";
import './Posts.css'
import PostItem from '../Component/PostItem';

function Posts() {
    const [allPosts, setPosts] = useState([]);
    const getPost = async()=>{
        const options = {
            method: 'GET',
/*             headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Access-Control-Allow-Origin': 'https://localhost:5173'
              }, */
        }
        const result = await fetch('https://localhost:7014/api/posts', options);
        if(result.ok){
            const posts = await result.json();
            console.log(posts);
            setPosts(posts);
            return posts;
        }
        return[];
    }
    const addPost = async ()=>{
        const headerFromUser = document.querySelector('#post-header').value;
        const textFromUser = document.querySelector('#post-text').value;
        const newPost = {
            id: 0,
            header: headerFromUser,
            text: textFromUser
        };
        /* const headers = new Headers();
        headers.set('Content-Type', 'application/json');  */
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Access-Control-Allow-Origin': 'https://localhost:5173'
              },
            body: JSON.stringify(newPost),
        };
        const result = await fetch('https://localhost:7014/api/posts', options);
        if(result.ok){
            const post =result.json();
            allPosts.push(post);
            setPosts(allPosts);
        }
        else{
            alert('error HTTP:' + result.status)
        }
    }
    useEffect(()=>{
        getPost();
    }, [])    
    return(
        <div className="section">
            <h5>Create new post</h5>
            <div className='content-block mb-5'>
                <div className="row">
                    <div className="mb-3 col-12">
                        <label htmlFor="post-header" className='form-label'>Header:</label>
                        <div className='input-group'>
                            <input type="text" placeholder='Header' className='form-control' id='post-header' />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-12">
                        <label htmlFor="post-text" className='form-label'>Content:</label>
                        <div className='input-group'>
                            <textarea name="" id="post-text" cols="30" rows="10" placeholder='Content' className='form-control'></textarea>
                        </div>
                    </div>
                </div>
                <button type='button' className='btn btn-primary' onClick={()=>addPost()}>Add new post</button>
            </div>
            <div className="row">
                <h5>{allPosts ? 'Existing posts' : ''}</h5>
                <div className="mb3 col-12 content-block existing_post">
                        {allPosts.map(x => (             
                                <PostItem key={x.id}
                                    id={x.id}
                                    header={x.header}
                                    text={x.text}>
                                    </PostItem>))}
                </div>
            </div>
        </div>
    )
}

export default Posts;


{/* <Link to={'/'}>
<button type ="button" className='btn btn-outline-primary'>Home page</button>
</Link> */}

