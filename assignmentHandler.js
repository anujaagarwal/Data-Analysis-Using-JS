import fetch from "node-fetch";

export const redundantWord = async () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method: "GET",
    headers: headers,
  };

  try {
    let response;
    const email = "anujaagarwal08@gmail.com";

    // Retry the request up to 3 times in case of HTTP 500
    for (let retryCount = 0; retryCount < 3; retryCount++) {
      response = await fetch(
        `https://one00x-data-analysis.onrender.com/assignment?email=${email}`,
        options
      );

      if (response.status === 200) {
        break; // Successful response, exit the retry loop
      } else if (response.status === 500) {
        console.log("Received HTTP 500, retrying...");
        continue; // Retry the request
      } else {
        throw new Error(`Unexpected HTTP status: ${response.status}`);
      }
    }

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      const wordMap = new Map();
      data.forEach((element) => {
        if (wordMap.has(element)) {
          let value = wordMap.get(element);
          value += 1;
          wordMap.set(element, value);
        } else {
          wordMap.set(element, 1);
        }
      });

      console.log(wordMap);

      const max = [...wordMap.entries()].reduce((accumulator, element) => {
        return element[1] > accumulator[1] ? element : accumulator;
      });

      const result = [...response.headers.entries()].filter((entries) => {
        return entries[0] === "x-assignment-id";
      });
      return { maxRepeatedWord: max[0], assignment_id: result[0][1] }; // Return the word with max count and return assignment Id with it.
    } else {
      console.log("API request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Failed to get data", error);
  }
};
