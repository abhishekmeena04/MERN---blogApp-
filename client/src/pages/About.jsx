import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);

  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        About
      </h1>
      <p className="text-lg text-gray-700">
        This is{" "}
        <strong className="text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300 transform hover:scale-105">
          {profile?.user?.name}
        </strong>{" "}
        a proficient full-stack developer with a robust skill set spanning both
        front-end and back-end technologies. With a passion for building
        dynamic, responsive, and user-friendly web applications, Akhil excels in
        crafting seamless digital experiences.
      </p>

      <h2 className="font-semibold text-blue-800 text-2xl mt-6">
        Technical Expertise:
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        Front-End: Adept in modern JavaScript frameworks and libraries such as
        React.js, Angular, and Vue.js. Skilled in HTML5, CSS3, and responsive
        design principles to create intuitive and visually appealing interfaces.
        Back-End: Proficient in server-side technologies including Node.js,
        Express.js, and Django. Experienced with database management using SQL
        and NoSQL databases like MySQL, PostgreSQL, and MongoDB. DevOps:
        Knowledgeable in containerization and orchestration tools such as Docker
        and Kubernetes. Familiar with continuous integration and deployment
        (CI/CD) pipelines. Cloud Services: Experience with cloud platforms like
        AWS, Azure, and Google Cloud, enabling scalable and reliable application
        deployment.
      </p>

      <h2 className="font-semibold text-blue-800 text-2xl mt-6">
        Professional Highlights:
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        Successfully developed and deployed numerous full-stack applications,
        demonstrating strong problem-solving skills and a keen eye for detail.
        Collaborated with cross-functional teams to deliver high-quality
        software solutions within tight deadlines. Continuously learning and
        adapting to emerging technologies and industry trends to stay ahead in
        the fast-evolving tech landscape.
      </p>
      
      <p className="mt-4 text-lg text-gray-700">
        Akhil K is dedicated to leveraging his expertise to contribute to
        innovative projects and drive technological advancements. Whether
        working on front-end interfaces or back-end logic, he is passionate
        about delivering exceptional digital solutions that meet user needs and
        exceed client expectations.
      </p>

      <h2 className="font-semibold text-blue-800 text-2xl mt-6">
        Personal Interests and Inspiration:
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        Beyond his professional achievements, Akhil is a big fan of cricket and
        holds immense admiration for{" "}
        <strong className="text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:scale-105">
          King Kohli
        </strong>
        . His favorite person and biggest inspiration is his twin brother,{" "}
        <strong className="text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:scale-105">
          Ankush
        </strong>
        . Their friendly rivalry and deep bond have significantly shaped Akhil’s
        journey. Ankush is not only a great competitor but also a steadfast
        friend, constantly motivating Akhil to strive for excellence.
      </p>

      {/* Social Media Links or Call to Action */}
      <div className="mt-8 flex justify-center gap-6">
        <a
          href="https://www.linkedin.com/in/akhil-k/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:scale-110"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/akhil-k"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:scale-110"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default About;
