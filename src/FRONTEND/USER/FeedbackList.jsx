import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Spinner, Alert, Card, Form, Button } from "react-bootstrap";
import Header1 from "../SERVICEPROVIDER/Header1";

const CustomerFeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/userfeedbacklist";
      if (startDate && endDate) {
        url += `?start_date=${startDate}&end_date=${endDate}`;
      }
      const response = await axios.get(url);
      setFeedback(response.data.feedback);
    } catch (err) {
      setError("Error fetching feedback. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <>
      <Header1 />
      <Container className="mt-5">
        <h2 className="mb-4 text-center fw-bold" style={{ fontSize: "2rem", color: "green" }}>
          Customer Feedback
        </h2>

        {/* Date Filter Form */}
        <Form className="mb-4 d-flex justify-content-center align-items-end">
          <Form.Group className="mx-2">
            <Form.Label className="fw-bold text-dark">Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={today} // Prevent future dates
              className="border border-success shadow-sm"
              style={{ padding: "8px", borderRadius: "8px" }}
            />
          </Form.Group>
          <Form.Group className="mx-2">
            <Form.Label className="fw-bold text-dark">End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate} // Prevent end date before start date
              max={today} // Prevent future dates
              className="border border-success shadow-sm"
              style={{ padding: "8px", borderRadius: "8px" }}
            />
          </Form.Group>
          <Button 
            className="mx-2 px-4 mt-3" 
            variant="success" 
            onClick={fetchFeedback}
            style={{ borderRadius: "8px", fontWeight: "bold" }}
          >
            Search
          </Button>
        </Form>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="success" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">{error}</Alert>
        ) : (
          <div className="d-flex flex-wrap justify-content-center">
            {feedback.map((item) => (
              <Card key={item.id} className="m-3 shadow" style={{ width: "22rem" }}>
                <Card.Body>
                  <Card.Title className="text-success">{item.user_name}</Card.Title>
                  <Card.Text className="text-muted">{item.message}</Card.Text>
                  <Card.Footer className="text-end text-muted">
                    {new Date(item.created_at).toLocaleString()}
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default CustomerFeedbackList;
