import { useState } from 'react';
import '../pages/Posts.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const modalButton = (props) => {
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return (
        <>
            <Button variant="secondary" size='sm' onClick={handleOpen}>
                Edit
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.modalContent}</Modal.Body>
                <Modal.Footer>
                <Button variant="outline-primary" onClick={()=>props.updatePost(props.post)}>
                        {props.btnName}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default modalButton;