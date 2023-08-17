console.log("content script injected");
const promptTextArea = document.querySelector("#prompt-textarea");
const parentElement = promptTextArea.parentNode;
let prompt;
const divider = `
<div class="flex gap-4 px-2 pb-4">
<div>
  <label for="field">Field:</label>
  <select
    id="field"
    class="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-900 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0"
  >
    <option value="default">Select Your Field</option>
    <option value="frontend">Frontend Developer</option>
    <option value="backend">Backend Developer</option>
    <option value="fullstack">Full Stack Developer</option>
    <option value="app developer">Mobile App Developer</option>
    <option value="devOps">DevOps</option>
    <option value="cloud computing">Cloud Computing</option>
    <option value="AR/VR developer:">AR/VR Developer</option>
  </select>
</div>

<div>
  <label for="section">Section:</label>
  <select
    id="section"
    class="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-900 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0"
  >
    <option value="default">Select Section</option>
    <option value="experience">Experience</option>
    <option value="projects">Projects</option>
    <option value="skills">Skills</option>
    <option value="achievements">Achievements</option>
    <option value="certifications">Certifications</option>
    <option value="education">Education</option>
  </select>
</div>
  
  <div class="flex flex-col">
  <label for="resume">Uploade Resume: </label>

          <label
      class="relative cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md shadow-md "
    >
      <span>Select a File</span>
      <input
        type="file"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </label>
  </div>


  
</div>
`;

let uploadefiles = `

`;
parentElement.insertAdjacentHTML("afterbegin", divider);
const buttonElement = parentElement.querySelector("button");

let selectedField, selectedSection;
// Field
const fieldDropdown = document.getElementById("field");
fieldDropdown.addEventListener("change", function () {
  selectedField = fieldDropdown.value;
});

// Resume Section
const sectionDropDown = document.getElementById("section");
sectionDropDown.addEventListener("change", function () {
  selectedSection = sectionDropDown.value;
});

const textarea = document.querySelector(
  `textarea:not([name^="${variableIDPrefix}"])`
);

console.log(textarea);
buttonElement.addEventListener("click", function () {
  let newPrompt = "";
  if (!selectedField && !selectedSection) return;
  switch (selectedSection) {
    case "skills":
      newPrompt = `
You are an experienced resume writer especially writing for ${selectedField} roles with high ATS score, your focus is on the skills section of a ${selectedField}'s resume. ${promptTextArea.value} Here is the short details about my ${selectedSection} section, and you need your expertise to transform them into highly optimized content with an exceptional ATS (Applicant Tracking System) score. Let's create a standout skills section using bullet points with single words (e.g., HTML, Tailwind CSS, React) while also including essential ${selectedField} skills. Do not include all the skills set for ${selectedField} instead generate result based on the user Details.If any skills which is necessary to become ${selectedField} which is not specified in the user details you can say the user that "The [skill] is required to become ${selectedField} developer" only if the skill is more important.

  Here is the blue print for Skill Section always follow this:
    Technical Skills(Bold Text):
      • Frameworks & Libraries
        • HTML
        • CSS
        • ReactJs
      • Version Control
        • Git
        • Github
      • Other Tools
        • VSCode`;
      break;
    case "projects":
      newPrompt = `You are an experienced resume writer especially writing for ${selectedField} roles with high ATS score, your focus is on the skills section of a ${selectedField}'s resume. ${promptTextArea.value} Here is the short details about my ${selectedSection} section, and you need your expertise to transform them into highly optimized content with an exceptional ATS (Applicant Tracking System) score.Be specific and concise when describing the projects. Highlight the main features and outcomes, and quantify the impact if possible. Only use the given data by the user to generate any projects by your own.Do not include the projects that are not relevant to the job applying for, which can confuse the ATS and the recruiters.Use layman's terms whenever possible, and provide very short explanations for any technical terms that are crucial to understanding the project.To make the information easier to read and scan, consider presenting the sections in bullet points.Including metrics like percentages, numerical values, or specific data points like "Optimized the website's checkout process, resulting in a 20% increase in conversion rate", However, make sure that the metrics use are accurate, relevant, and verifiable. Avoid exaggerating or providing misleading information. If possible, back up the claims with additional context or explain how you measured the metrics and try to ask the user to provide some proof. 

Your task: Create high optimized Project Section that are relavent for ${selectedField} base on the [User Detials].

- Write the Proper Title for Projects.
- Write 3 bullet points for the Description.

  Here is the blue print for Skill Section always follow this, and this is just for your reference:
    E-commerce Website:
    [Live Preview](hyperlink) | [GitHub](hyperlink)
        • Description:
            • Developed a responsive e-commerce website that allows users to browse products, add items to the cart, and proceed to checkout.
            • Implemented a user authentication system and integrated it with a secure payment gateway.
            • Implemented performance optimizations, leading to a 40% reduction in page load time, resulting in improved user experience [Proof](hyperlink).

        • Technologies Used:
            • HTML5, CSS3, JavaScript, React, Redux, Node.js, Express.js

`;
      break;
    case "education":
      newPrompt = `
      You are an experienced resume writer with high ATS score, your focus is on the ${selectedSection} section of resume. Here is the  detials about me ${promptTextArea.value}, and you will provide a contnet ${selectedSection} section of my resume with high ATS Score based on my blue print. 

Please adhere to the structure and formatting below, and follow these guidelines:

- Generate content based the my personal data.
- Double-check and ensure that the user have included the correct names of institutions, degrees earned, dates of graduation, and any relevant honors or awards.
- Omite the GPA (Grade Point Average), especially if less than 7.5 / 10 or 3 / 5.
- Use chronological order to present the education section.

Here is the blue print for  Education Section :
    Bachelor of Science in Computer Science
    XYZ University
    May 2021 - May 2025
    CGPA : 8.30
    Cityville, Stateville `;
      break;

    case "certifications":
      newPrompt = `
      You are an experienced resume writer especially writing for ${selectedField} roles with high ATS score, your focus is on the ${selectedSection} section of ${selectedField}'s resume. Here is the list of course ${promptTextArea.value}, and you will provide a detailed contnet for my resume with high ATS Score. 

Please adhere to the structure and formatting below, and follow these guidelines:

- Do not generate the description just follow the structure.
- Do not include too many certifications without instead focus on the most relevant ones.
- Only use the given data by the user to generate any certificates by your own.
- Use chronological order to present the education section.
- Include links to the official certification pages or provide proof of certification on the portfolio or LinkedIn profile use as hyperlink.

Structure:
    [1] = Certification Name: Provide the full name of the certification you earned.

Formatting:
Follow this Skill List structure: 
    "[1](hyperlink)"

Example Education Section:
    [React.js Developer Certification By Meta](hyperlink)

      Also advice the user to use hyperlink of the certifications doc
      `;
      break;

    case "achievements":
      newPrompt = `Attention resume content optimization experts! your focus is on the Awards and Honors section of a ${selectedField}'s resume. Here is the details about my awards and honors ${promptTextArea.value}, and I need your expertise to create optimized content with an outstanding ATS (Applicant Tracking System) score. We should only include awards and honors that are related to the ${selectedField} field. If a particular award or honor isn't added, please explain the reason behind its omission. How can we strategically present these achievements to impress potential employers and demonstrate the ${selectedField}'s excellence and recognition in the industry and the awards and honors section in bullet points`;
      break;

    case "experience":
      newPrompt = `  You are an experienced resume writer especially writing for ${selectedField} roles with high ATS score, your focus is on the ${selectedSection} section of ${selectedField}'s resume. Here is the Details of my experience ${promptTextArea.value} , and you will provide a detailed contnet for my resume with high ATS Score. 
  Please adhere to the structure and formatting below, and follow these guidelines:
    - Be specific and highlight measurable results or contributions to demonstrate your impact in previous roles.
    - Use bullet points to break down the responsibilities and achievements into concise and easily scannable points.
    - Use keywords relevant to the job posting but ensure they are used in a natural and contextually appropriate way.
    - Focus on showcasing experiences that directly relate to the job you are seeking.
    - Use chronological order to present the experience section.
    - Include the months and years for each position held, ask the user if he didn't mention.

  Structure:
    [1] = Job Title: Provide the title of your position in the company.
    [2] = Company Name: Include the name of the company or organization you worked for.
    [3] = Dates of Employment: Include the start and end dates of your employment for each position.
    [4] = Description of Responsibilities and Achievements: Provide a concise description of your key responsibilities and notable achievements in the role. Use bullet points for better readability and try to give the points which will answer "In which technology you user worked", "What impact it brings" and the description should only be 4 points and generate the content with simple and human touch .

  Your task: Create high optimized skills that are relevant for ${selectedField} base on the [User Details ].
    - Write the skill section based on the user details.
    - Do not include all the skills set for ${selectedField} instead generate result based on the user Details 
    - If any skills which is nessary to become ${selectedField} which is not specified in the user details you can say the user that "The [skill] is required to become ${selectedField} developer" only if the skill is more important.
    - Transform [User details] into highly optimized content with an exceptional ATS (Applicant Tracking System) score
  Example Skill Section:
      Front-End Developer
      TechSolutions Inc.
      June 2019 - September 2022
      - Collaborated with cross-functional teams to design and develop responsive web applications using HTML5, CSS3, and JavaScript, ensuring optimal user experience across various devices and browsers.
      - Led the redesign of the company's flagship product, resulting in a 30% increase in user engagement and a 20% reduction in bounce rates.
      - Implemented modern front-end frameworks like React.js, enhancing code maintainability and enabling rapid feature development, leading to a 40% decrease in development time.
      - Improved website performance by optimizing critical rendering paths, reducing page load times by an average of 25% and enhancing overall user satisfaction.
`;
      break;

    default:
      break;
  }

  promptTextArea.value = newPrompt;
});
