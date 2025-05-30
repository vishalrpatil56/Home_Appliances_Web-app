import { useEffect, useState } from "react";
import axios from "axios";
import "./Style/FeedbackList.css"; 
import Header from "./Header";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/feedbacklist")
      .then((response) => setFeedbacks(response.data))
      .catch((error) => console.error("Error fetching feedbacks:", error));
  },); 
  return (<>
    <Header/>
    <div className="main-content">
      <div className="table-wrapper">
        <h1 style={{ fontWeight: "bolder", fontFamily: "serif" }}>
          Feedback List :
        </h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DESCRIPTION</th>
              <th>ServicProvider_Id</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.feedback_id}>
                <td>{feedback.feedback_id}</td>
                <td>{feedback.feedback_description}</td>
                <td>{feedback.serviceprovider_id}</td>
                <td>👍💬 ✅
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default FeedbackList;