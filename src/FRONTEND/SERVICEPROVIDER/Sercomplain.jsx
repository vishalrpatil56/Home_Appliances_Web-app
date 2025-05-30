import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header1 from "./Header1";

function SerComplain() {
  const [complain, setComplain] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceprovider_id = localStorage.getItem("serviceprovider_id"); // Get logged-in Service Provider ID

    if (!serviceprovider_id) {
      toast.error("You must be logged in to submit a complaint!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/submit-service-complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceprovider_id, message: complain }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Complaint submitted successfully!", { position: "top-center" });
        setComplain(""); // Clear input field
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to submit complaint. Try again later.");
    }
  };

  return (
    <>
      <Header1/>
      <Container className="mt-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <Image src="home.png" alt="Complain" fluid style={{ maxWidth: "100%", height: "auto" }} />
          </Col>

          <Col md={6}>
            <h2 className="mb-4 fw-bold">Service Provider Complaint :</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Your Complaint"
                  value={complain}
                  onChange={(e) => setComplain(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ padding: "10px 20px", backgroundColor: "red" }}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <footer className="bg-black text-white text-center py-3">
        <h4> <p>&copy; 2025 Home Appliance Service. All rights reserved.</p> </h4>
        <p>
          <a href="/privacy" className="text-white">Privacy Policy</a> | 
          <a href="/terms" className="text-white"> Terms of Service</a>
        </p>
      </footer>
      <ToastContainer />
    </>
  );
}

export default SerComplain;
