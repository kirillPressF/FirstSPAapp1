import '../pages/Posts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const PostItem=(props)=>(
    <div className='posts' key={props.key}>
        <h6>Header: {props.header}</h6>
        <p>Content: {props.text}</p>
        <hr />
    </div>)
    
export default PostItem;