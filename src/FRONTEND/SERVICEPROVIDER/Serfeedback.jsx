import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header1 from "./Header1";


function Serfeedback() {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const serviceprovider_id = localStorage.getItem("serviceprovider_id"); // Get logged-in service provider ID

        if (!serviceprovider_id) {
            toast.error("You must be logged in to submit feedback!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/submit-serviceprovider-feedback", { serviceprovider_id, feedback });

            if (response.data.success) {
                toast.success("Feedback Submitted Successfully!", { position: "top-center" });
                setFeedback(""); // Clear input field
            } else {
                toast.error("Failed to submit feedback");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <>
           <Header1/>
            <Container className="mt-5">
                <Row className="align-items-center">
                    {/* Left Side - Image */}
                    <Col md={6} className="text-center">
                        <Image 
                            src="home.png"
                            alt="Feedback" 
                            fluid 
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </Col>

                    {/* Right Side - Form */}
                    <Col md={6}>
                        <h2 className="mb-4 fw-bold">SERVICE PROVIDER FEEDBACK :</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Your Feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button 
                                variant="primary" 
                                type="submit" 
                                style={{ padding: "10px 20px", backgroundColor: "green" }}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <footer className="bg-black text-white text-center py-3">
                <h4> <p>&copy; 2025 Home Appliance Service. All rights reserved.</p></h4>
                <p>
                    <a href="/privacy" className="text-white">Privacy Policy</a> |{" "}
                    <a href="/terms" className="text-white">Terms of Service</a>
                </p>
            </footer>
            <ToastContainer />
        </>
    );
}

export default Serfeedback;
