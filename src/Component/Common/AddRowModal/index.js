import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { columnFields } from "../../../Utils/agGridUtils";

const AddRowModal = (props) => {
  const {
    show,
    handleClose,
    heading,
    handleSubmit,
    dfuAddRowData,
    handleChange,
    addDfuDropDownOption,
  } = props;
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="addDfuForm" onSubmit={handleSubmit}>
          <>
            <Row>
              <Col sm={1} />
              <Col sm={4} style={{ padding: "5px" }}>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  size="sm"
                  type="date"
                  name="startDate"
                  value={dfuAddRowData["startDate"] ?? ""}
                  required
                />
              </Col>
              <Col sm={4} style={{ margin: "5px" }}>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  size="sm"
                  type="date"
                  name="endDate"
                  value={dfuAddRowData["endDate"] ?? ""}
                  required
                />
              </Col>

              {columnFields.map((field, i) => (
                <Form.Group
                  key={i}
                  style={{ margin: "5px" }}
                  as={Row}
                  controlId={`${i}_${field.value}`}
                >
                  <Col sm={4}>
                    <Form.Label>
                      <b>{field.label}</b>
                    </Form.Label>
                  </Col>
                  <Col sm={3}>
                    {field.select && (
                      <Form.Select
                        onChange={(e) => {
                          e.preventDefault();
                          handleChange({
                            target: {
                              name: field.value,
                              value: e.target.value,
                            },
                          });
                        }}
                        size="sm"
                        aria-label="select options"
                      >
                        <option value={""}>Select {field.label}</option>
                        {addDfuDropDownOption[field.option ?? field.value].map(
                          (option, index) => (
                            <option
                              key={`${field.value}_${index}_`}
                              value={option}
                            >
                              {option}
                            </option>
                          )
                        )}
                      </Form.Select>
                    )}
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      size="sm"
                      type="text"
                      name={field.value}
                      value={dfuAddRowData[field.value] ?? ""}
                      required
                    />
                  </Col>
                </Form.Group>
              ))}
            </Row>
          </>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button form="addDfuForm" type="submit" variant="info">
          ADD DFU
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRowModal;
