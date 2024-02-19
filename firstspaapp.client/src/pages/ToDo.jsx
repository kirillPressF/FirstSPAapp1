import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './ToDo.css'
import PostItem from '../Component/PostItem';

function Posts() {
    const [allPosts, setPosts] = useState([]);
    const getPost = async()=>{
        const options = {
            method: 'GET',
        }
        const result = await fetch('https://localhost:7014/api/Posts', options);
        if(result.ok){
            const posts = await result.json();
            console.log(posts);
            setPosts(posts);
            return posts;
        }
        return[];
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
                <button type='button' className='btn btn-primary'>Add new post</button>
            </div>
            <div className="row">
                <h5>{allPosts?'Existing posts': ''}</h5>
                <div className="mb3 col-12 content-block existing_post">
                    <div>
                        {allPosts.map(x => 
                        <PostItem
                        key = {x.id}
                        header = {x.header}
                        text = {x.text}
                        />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts;


{/* <Link to={'/'}>
<button type ="button" className='btn btn-outline-primary'>Home page</button>
</Link> */}

