import React, { useState } from "react";
import HowItWorks from "../Shared/HowItWorks";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import {
//   faGithub,
//   faInstagram,
//   faLinkedin,
//   faXTwitter,
// } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import pic from "../../media/pp.jpeg";

const AboutUsPage = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  return (
    <div className="max-w-5xl mx-auto bg-white min-h-[calc(100vh-58px)] shadow-md px-12">
      <header className="text-center p-6">
        <div className="text-4xl sm:text-6xl font-black p-2">
          <span className="text-sky">lo</span>
          <span className="text-navy">FOUND</span>
        </div>
        <p className="text-navy font-bold">
          A modern web app powered by the MERN stack.
        </p>
      </header>
      <section className="mb-6">
        <h2 className="text-left text-xl text-navy font-extrabold py-2">
          Introduction
        </h2>
        <p className="text-gray-600 ">
          loFOUND is designed to be a centralized hub for the university community. On a busy campus,
          it’s common for people to misplace or find items. 
          loFOUND streamlines the process of reporting lost belongings and helps ensure their return to the rightful owners. By applying technology, we aim to improve the overall 
          lost and found experience across the whole university.
        </p>
      </section>

      <hr></hr>
      <div className="flex justify-between py-4">
        <h2 className="text-left text-xl text-navy font-extrabold">
          How It Works
        </h2>
        <button
          className="text-right text-3xl text-navy font-extrabold"
          onClick={() => setShowHowItWorks(!showHowItWorks)}
        >
          {showHowItWorks ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </button>
      </div>
      {showHowItWorks && <HowItWorks />}
      <hr></hr>

      {/* <section className="pt-2 pb-8">
        <h2 className="text-left text-xl text-navy font-extrabold py-2">
          Meet the Developer
        </h2>
        <div className="my-2 flex flex-col md:flex-row">
          <img
            src={pic}
            alt="Profile"
            className="rounded-full m-4 md:mr-4 md:mb-0 h-48 w-48"
          />
          <div className="p-4 ">
            <h3 className="text-xl font-semibold text-navy">Varitant Arora</h3>
            <p className="text-gray-600">
              Computer Engineering student at JC Bose University, YMCA,
              Faridabad
            </p>
            <p className="text-gray-600">
              Passionate about building web applications that make a positive
              impact. Experienced in JavaScript, React.js, Node.js, Express.js,
              MongoDB, TailwindCSS.
            </p>

            <div className="mt-2">
              <p className="text-gray-600">
                <span className="font-semibold ">Email:</span>{" "}
                varitanta@gmail.com
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Phone:</span> 8059909343
              </p>
              <div className="flex mt-2 text-3xl text-navy">
                <a
                  href="https://twitter.com/varitant_arora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 hover:scale-125"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
                <a
                  href="https://www.linkedin.com/in/varitantarora/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 hover:scale-125"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href="https://github.com/varitantarora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 hover:scale-125"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href="https://instagram.com/varitantarora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 hover:scale-125"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutUsPage;
