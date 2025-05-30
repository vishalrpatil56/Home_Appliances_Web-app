import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Spinner, Alert, Card, Form, Button } from "react-bootstrap";
import Header1 from "../SERVICEPROVIDER/Header1";

const CustomerComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/usercomplainlist";
      if (startDate && endDate) {
        url += `?start_date=${startDate}&end_date=${endDate}`;
      }
      const response = await axios.get(url);
      setComplaints(response.data.complaints);
    } catch (err) {
      setError("Error fetching complaints. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <>
      <Header1 />
      <Container className="mt-5">
        <h2 className="mb-4 text-center fw-bold" style={{ fontSize: "2rem", color: "red" }}>
          Customer Complaints
        </h2>

        {/* Date Filter Form */}
        <Form className="mb-4 d-flex justify-content-center align-items-end">
          <Form.Group className="mx-2">
            <Form.Label className="fw-bold text-dark">Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={today} // Restrict future dates
              className="border border-danger shadow-sm"
              style={{ padding: "8px", borderRadius: "8px" }}
            />
          </Form.Group>
          <Form.Group className="mx-2">
            <Form.Label className="fw-bold text-dark">End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate} // Prevent selecting an end date before start date
              max={today} // Restrict future dates
              className="border border-danger shadow-sm"
              style={{ padding: "8px", borderRadius: "8px" }}
            />
          </Form.Group>
          <Button 
            className="mx-2 px-4 mt-3" 
            variant="danger" 
            onClick={fetchComplaints}
            style={{ borderRadius: "8px", fontWeight: "bold" }}
          >
            Search
          </Button>
        </Form>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">{error}</Alert>
        ) : (
          <div className="d-flex flex-wrap justify-content-center">
            {complaints.map((item) => (
              <Card key={item.id} className="m-3 shadow" style={{ width: "22rem" }}>
                <Card.Body>
                  <Card.Title className="text-danger">{item.user_name}</Card.Title>
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

export default CustomerComplaintList;
