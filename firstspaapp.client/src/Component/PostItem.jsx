import '../pages/Posts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalButton from './ModalBtn';

const PostItem = ({ header, text, id, updatePost, deletePost, post, handleChangeHeader, handleChangeText }) => {

    return (
        <div className='posts'>
            <h6>Header: {header}</h6>
            <p>Content: {text}</p>
            <div className="container-buttons mb-2">
                <ModalButton btnName={'Save changes'}
                    title={'Update post'}
                    updatePost={updatePost}
                    post={post}
                    modalContent={
                        <div>
                            <div>
                                <input type="text" className="form-control mb-3" defaultValue={header} onChange={(e) => handleChangeHeader(e.target.value)} />
                            </div>
                            <div>
                                <textarea name="" cols="30" rows="10" className='form-control mb-1' defaultValue={text} onChange={(e) => handleChangeText(e.target.value)}></textarea>
                            </div>
                        </div>
                    } />
                <button className='btn btn-outline-primary btn-sm' onClick={() => deletePost(id)}>Delete</button>
            </div>
            <hr />
        </div>
    )
}

export default PostItem;