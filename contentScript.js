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
  </select>
</div>

<div>
  <label for="section">Section:</label>
  <select
    id="section"
    class="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-900 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0"
  >
    <option value="default">Select Section</option>
    <option value="certifications">Certifications</option>
    <option value="skills">Skills</option>
    <option value="projects">Projects</option>
    <option value="education">Education</option>
    <option value="achievements">Achievements </option>
  </select>
</div>

<div>
  <label for="length">Length:</label>
  <select
    id="length"
    class="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-900 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0"
  >
    <option value="short">short</option>
    <option value="long">long</option>
  </select>
</div>
</div>
`;
parentElement.insertAdjacentHTML("afterbegin", divider);
const buttonElement = parentElement.querySelector("button");

let selectedField, selectedSection, selectedLength;
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

// Experience Section
const lengthDropDown = document.getElementById("length");
lengthDropDown.addEventListener("change", function () {
  selectedLength = lengthDropDown.value;
});

buttonElement.addEventListener("click", function () {
  let newPrompt;
  switch (selectedSection) {
    case "skills":
      newPrompt = `[Job Role] = ${selectedField}, [Given Section] = ${selectedSection}, [User Details] = ${promptTextArea.value}
  You are an experienced resume writer especially writing for [Job Role] roles with high ATS score, your focus is on the [Given Scetion] section of [Job Role]'s resume. I will give you a Details , and you will provide a detailed contnet for my resume with high ATS Score. 
  Please adhere to the structure and formatting below, and follow these guidelines:
    - Do not use a generic list of skills that are not tailored to the [Job Role] job application. For example, listing common skills like "communication skills" or "team player" is not relevant.
    - Do not overloading the skills section with irrelevant keywords or excessively repeating the same skills multiple times. 
    - Use keywords relevant to the job posting but ensure they are used in a natural and contextually appropriate way.
    - Do not include the skills that are not relevant to the job you are applying.
    - To make the information easier to read and scan, consider presenting the sections in bullet points.

  Structure:
    [1] = "Technical Skills" Heading.
    [2] = subheadings that list specific skills or tools related to Technical Skills category for the [Job Role] roles.
    [3] = content under each subheading provides details about the skills, languages, frameworks, and tools the [Job Role] developer is proficient in.

    Remember to customize the content based on the actual skills for [Job Role].

  Formatting:
    Follow this Skill List structure: 
    "[1](Bold Text) : 
        •[2] : [3], [3]....
        •[2] : [3], [3]...."

  Your task: Create high optimized skills that are relevant for [Job Role] base on the [User Details ].
    - Write the skill section based on the user details.
    - Do not include all the skills set for [Job Role] instead generate result based on the user Details 
    - If any skills which is nessary to become [Job Role] which is not specified in the user details you can say the user that "The [skill] is required to become [Job Role] developer" only if the skill is more important.
    - Transform [User details] into highly optimized content with an exceptional ATS (Applicant Tracking System) score
  Example Skill Section:
    Technical Skills(Bold Text):
        • Programming Languages: HTML, CSS, JavaScript, TypeScript
        • Front-End Frameworks: React, Angular, Vue.js
        • CSS Preprocessors: SASS, LESS
        • Build Tools: Webpack
        • Package Managers: npm, Yarn
        • Version Control: Git, GitHub`;
      break;
    case "projects":
      newPrompt = `[Job Role] = ${selectedField}, [Given Section] = ${selectedSection}, [User Details] = ${promptTextArea.value}
You are an experienced resume writer especially writing for [Job Role] roles with high ATS score, your focus is on the [Given Scetion] section of [Job Role]'s resume. I will give you a detials, and you will provide a detailed contnet for my resume with high ATS Score. 

Please adhere to the structure and formatting below, and follow these guidelines:

- Be specific and concise when describing the projects. Highlight the main features and outcomes, and quantify the impact if possible.
- Do not include the projects that are not relevant to the job applying for, which can confuse the ATS and the recruiters.
- Clearly list the relevant technologies used in each project also make bold text to the technologies used. Use industry-standard names and avoid abbreviations or jargon.
- Use layman's terms whenever possible, and provide very short explanations for any technical terms that are crucial to understanding the project.
- To make the information easier to read and scan, consider presenting the sections in bullet points.
- Including metrics like percentages, numerical values, or specific data points like "Optimized the website's checkout process, resulting in a 20% increase in conversion rate", However, make sure that the metrics use are accurate, relevant, and verifiable. Avoid exaggerating or providing misleading information. If possible, back up the claims with additional context or explain how you measured the metrics and try to ask the user to provide some proof. 


Structure:
[1] = Project Title: Provide a clear and descriptive title for each project.
[2] = Project Description: Summarize the purpose and features of the project.
[3] = Technologies Used: List the front-end technologies, frameworks, and tools used in the project.

Project Link : Include a hyperlink to the live project, GitHub repository, or portfolio page for easy access to your work.

Formatting:
Follow this Skill List structure: 
"  [1](Bold Text) : 
    • Description: 
        •[2]....
        •[2]....
        •[2]....
    •Technologies Used:
        •[3], [3], [3]....
"
Your task: Create high optimized Project Section that are relavent for [Job Role] base on the [User Detials].

- Write the Proper Title for Projects.
- Write the 3 points for the Description.
- Bullet Points: To make the information easier to read and scan, consider presenting the "Description," and "Technologies Used," sections in bullet points.
- Transform [User details] into highly optimized content with an exceptional ATS (Applicant Tracking System) score


Example Skill Section:
    E-commerce Website (Bold Text)
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
      newPrompt = `[Job Role] = ${selectedField}, [Given Section] = ${selectedSection}, [User Details] = ${promptTextArea.value}
      You are an experienced resume writer especially writing for [Job Role] roles with high ATS score, your focus is on the [Given Scetion] section of [Job Role]'s resume. I will give you a detials, and you will provide a detailed contnet for my resume with high ATS Score. 

Please adhere to the structure and formatting below, and follow these guidelines:

- Double-check and ensure that the user have included the correct names of institutions, degrees earned, dates of graduation, and any relevant honors or awards.
- Omite the GPA (Grade Point Average), especially if less CGPA.
- Use chronological order to present the education section.

Structure:
    [1] = Highest Qualification (e.g., Bachelor's in Computer Science)
    [2] = University or Institution's Name
    [3] = Starting Year - Completion Year
    [4] = CGPA (only if higher, e.g., 7.5/10 or 3/5); otherwise, no needfor CGPA.
    [5] = Location

Formatting:
Follow this Skill List structure: 
"  [1](Bold Text) : 
    • [2]
    • [3] (Starting Year - Completion Year)
    • [4] (optional)
    • [5] (optional)
"
Your task: Create high optimized [Given Scetion] Section.
- Make sure that the contnet genereated is ATS frienflly


Example Education Section:

    Bachelor of Science in Computer Science
    XYZ University
    May 2021 - May 2025
    CGPA : 8.30
    Cityville, Stateville`;
      break;
    case "certifications":
      newPrompt = `[Job Role] = ${selectedField}, [Given Section] = ${selectedSection}, [User Details] = ${promptTextArea.value}
      You are an experienced resume writer especially writing for [Job Role] roles with high ATS score, your focus is on the [Given Scetion] section of [Job Role]'s resume. I will give you a detials, and you will provide a detailed contnet for my resume with high ATS Score. 

Please adhere to the structure and formatting below, and follow these guidelines:

- Do not include too many certifications without instead focus on the most relevant ones.
- Use chronological order to present the education section.
- Include links to the official certification pages or provide proof of certification on the portfolio or LinkedIn profile use as hyperlink.

Structure:
    [1] = Certification Name: Provide the full name of the certification you earned.

Formatting:
Follow this Skill List structure: 
    "[1](hyperlink)"

Your task: Create high optimized [Given Scetion] Section.
- Make sure that the contnet genereated is ATS frienflly


Example Education Section:
    [React.js Developer Certification By Meta](hyperlink)

      Also advice the user to use hyperlink of the certifications doc
      `;
      break;
    case "achievements":
      newPrompt = `Attention resume content optimization experts! your focus is on the Awards and Honors section of a ${selectedField}'s resume. Here is the details about my awards and honors ${promptTextArea.value}, and I need your expertise to create optimized content with an outstanding ATS (Applicant Tracking System) score. We should only include awards and honors that are related to the ${selectedField} field. If a particular award or honor isn't added, please explain the reason behind its omission. How can we strategically present these achievements to impress potential employers and demonstrate the ${selectedField}'s excellence and recognition in the industry and the awards and honors section in bullet points`;
      break;
    default:
      break;
  }

  promptTextArea.value = promptTextArea.value + sampleInput;
});

// <textarea id="prompt-textarea" tabindex="0" data-id="request-:r3a:-2" rows="1" placeholder="Send a message" class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0" style="max-height: 200px; height: 24px; overflow-y: hidden;"></textarea>

// <textarea id="prompt-textarea" tabindex="0" data-id="root" rows="1" placeholder="[keyword]" class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0" style="max-height: 200px; height: 24px; overflow-y: hidden;"></textarea>
