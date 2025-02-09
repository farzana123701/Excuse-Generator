const recipientModifiers = {
    boss: "Sir/Ma'am, ",
    teacher: "Professor, ",
    friend: "Bro, ",
    parents: "Mom/Dad, ",
    familymember: "Dear "
};

// Replace with your secure API key
const API_KEY = "AIzaSyA74Y-mYMglGZA7F6rdPlhuJKykNMkz2x0";  

async function generateExcuse() {
    let category = document.getElementById("category").value;
    let style = document.getElementById("styles").value;
    let recipient = document.getElementById("recipient").value;
    let recipientText = recipientModifiers[recipient];

    let prompt = `You are an excuse generation. Your job is to generate an excuse in the style and 
    category specified to tell a person type.make it creative and short. You should only generate excuses . There must be no disclaimers or headings.
    Style is ${style}, Excuse is of category ${category}, Recipient is ${recipient}.`;

    try {
        // Debugging prompt and the API request
        console.log("Generated prompt: ", prompt);

        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({
            //     // model: "gemini-pro", 
            //     prompt: { text: prompt },
            //     // maxTokens: 100
            // })
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        // Parse the JSON response from Gemini API
        let data = await response.json();
        let textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log(textResponse)
        console.log("API Response:", data); // Inspecting the full response

        if (textResponse) {
            // let excuse = data.choices[0].text.trim();
            document.getElementById("excuse").innerText = textResponse;
        } else {
            document.getElementById("excuse").innerText = "No response received. Try again.";
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("excuse").innerText = "Error generating excuse. Check console.";
    }
}
