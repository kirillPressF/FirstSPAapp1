import { useEffect, useState } from 'react';
import { Link, json } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Posts.css'
import PostItem from '../Component/PostItem';

function Posts() {
    const [allPosts, setPosts] = useState([]);
    const [header, setHeader] = useState("");
    const [text, setText] = useState("");
    const handleChangeHeader = (header) => {
        console.log('header: ' + header);
        setHeader(header);
    }
    const handleChangeText = (text) => {
        console.log('text: ' + text);
        setText(text);
    }

    const URL = 'https://localhost:7014/api/posts';
    const getPost = async () => {
        const options = {
            method: 'GET',
            /*             headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                            'Access-Control-Allow-Origin': 'https://localhost:5173'
                          }, */
        }
        const result = await fetch('https://localhost:7014/api/posts', options);
        if (result.ok) {
            const posts = await result.json();
            console.log(posts);
            setPosts(posts);
            return posts;
        }
        return [];
    }
    const addPost = async () => {
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
                'Access-Control-Allow-Origin': 'https://localhost:7014/api/posts'
            },
            body: JSON.stringify(newPost),
        };
        const result = await fetch('https://localhost:7014/api/posts', options);
        if (result.ok) {
            const post = result.json();
            setPosts([...allPosts, post]);
        }
        else {
            alert('error HTTP:' + result.status)
        }
    }
    const deletePost = (id) => {
        const options = {
            method: 'DELETE',
            headers: new Headers()
        }
        const result = fetch(URL + `/${id}`, options);
        setPosts(allPosts.filter(post => post.id != id));
    }
    const updatePost = async (post) => {
        let updateHeader = header ===""?(post.header):(header);
        let updateText = text ===""?(post.text):(text);
        const newPost = {
            id: post.id,
            header: updateHeader,
            text: updateText,
        }
        console.log(newPost)
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Access-Control-Allow-Origin': 'https://localhost:5173'
            },
            body: JSON.stringify(newPost),
        };

        const result = await fetch('https://localhost:7014/api/posts', options);
        if (result.ok) {
            const post = result.json();
            console.log(post);
            const updatedPost = allPosts.findIndex(x => x.id === newPost.id);
            allPosts[updatedPost] = post;
            setPosts(allPosts.slice());
        }
        else {
            console.log(result)
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    return (
        <div className="section">
            <div className="link mb-5">
                <Link to={'/'}>
                    <button type="button" className='btn btn-outline-primary'>Home page</button>
                </Link>
            </div>
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
                <button type='button' className='btn btn-primary' onClick={() => addPost()}>Add new post</button>
            </div>



            <div className="row">
                <h5>{allPosts ? 'Existing posts' : ''}</h5>
                <div className="mb3 col-12 content-block existing_post">
                    {allPosts.map(x => {
                        return (
                            <PostItem key={x.id}
                                id={x.id}
                                header={x.header}
                                text={x.text}
                                deletePost={deletePost}
                                updatePost={updatePost}
                                post={x}
                                handleChangeHeader={handleChangeHeader}
                                handleChangeText={handleChangeText}
                            >
                            </PostItem>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Posts;