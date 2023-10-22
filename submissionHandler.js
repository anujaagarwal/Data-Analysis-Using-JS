import { redundantWord } from "./assignmentHandler.js";
import fetch from "node-fetch"; // Import fetch from node-fetch

const ifCorrectSubmission = async () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const { maxRepeatedWord, assignment_id } = await redundantWord();

  const body = {
    email: "anujaagarwal08@gmail.com",
    answer: String(maxRepeatedWord),
    assignment_id: String(assignment_id),
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  };

  try {
    const response = await fetch(
      "https://one00x-data-analysis.onrender.com/assignment",
      options
    );
    console.log(body);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error("error occured", error);
  }
};

ifCorrectSubmission();
