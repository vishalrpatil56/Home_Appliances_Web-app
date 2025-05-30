import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
// import Header1 from "./Header1";
// import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CusHeader from "./CusHeader";
import CusFooter from "./CusFooter";

function Cuscomplain() {
  const [complain, setComplain] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id"); // Get logged-in user ID

    if (!user_id) {
      toast.error("You must be logged in to submit feedback!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/submit-complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, message: complain }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Complaint submitted successfully!", {
          position: "top-center",
        });
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
      <CusHeader />
      <Container className="mt-5">
        <Row className="align-items-center">
          {/* Left Side - Image */}
          <Col md={6} className="text-center">
            <Image
              src="home.png"
              alt="Complain"
              fluid
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Col>

          {/* Right Side - Form */}
          <Col md={6}>
            <h2 className="mb-4 fw-bold">COMPLAIN :</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Your Complain"
                  value={complain}
                  onChange={(e) => setComplain(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ padding: "10px 20px", backgroundColor: "red" }}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* <Footer/> */}
      <footer className="bg-black text-white text-center py-3">
        <h4>
          {" "}
          <p>&copy; 2025 Home Appliance Service. All rights reserved.</p>
        </h4>
        <p>
          <a href="/privacy" className="text-white">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-white">
            Terms of Service
          </a>
        </p>
      </footer>
        <ToastContainer />
    </>
  );
}

export default Cuscomplain;
