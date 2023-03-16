import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function Opt(props) {
  const { show, setShow, hardMode, setHardMode } = props;

  const handleClose = () => {
    setShow(true);
  };

  const styles = {
    line: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '0.75em',
      borderBottom: '1px solid rgba(0, 0, 0, .2)',
      margin: '0 2em 0.75em',
    },
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div>Options</div>
        </Modal.Header>
        <Modal.Body>
          <div style={styles.line}>
            <span>Hard Mode</span>
            <span style={{ fontSize: 'smaller' }}>
              This doesn't do anyting yet.
            </span>
            <Form.Check
              type="switch"
              id="custom-switch"
              // label="Check this switch"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
