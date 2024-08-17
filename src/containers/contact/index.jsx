import React, { useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
import { Animate } from "react-simple-animate";
import "./styles.scss";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const sendEmail = (e) => {
    debugger
    if (name && email && description) {
      e.preventDefault();
      setLoading(true); // Start the loader

      const templateParams = {
        name: name,
        email: email,
        description: description,
      };

      emailjs
        .send(
          "service_o9k1em9", // Replace with your service ID
          "template_9qnw4fm", // Replace with your template ID
          templateParams,
          "kVje-zvmuMeNJjnnx" // Replace with your public user ID
        )
        .then((result) => {
          console.log(result.text);
          setDone(true);
          setName("");
          setEmail("");
          setDescription("");
          toast.success("Email sent successfully!"); // Display success toast
        })
        .catch((error) => {
          console.error(error.text);
          toast.error("Failed to send email. Please try again."); // Display error toast
        })
        .finally(() => {
          setLoading(false); // Stop the loader
        });
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <section id="contact" className="contact">
      <ToastContainer />
      <PageHeaderContent
        headerText="My Contact"
        icon={<BsInfoCircleFill size={40} />}
      />
      <div className="contact__content">
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(-200px)",
          }}
          end={{
            transform: "translateX(0px)",
          }}
        >
          <h3 className="contact__content__header-text">Let's Talk</h3>
        </Animate>
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(200px)",
          }}
          end={{
            transform: "translateX(0px)",
          }}
        >
          <div className="contact__content__form">
            <div className="contact__content__form__controlswrapper">
              <div>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="inputName"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputEmail"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="inputDescription"
                  rows="5"
                  placeholder="Description"
                />
              </div>
            </div>
            <button onClick={sendEmail} disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </Animate>
      </div>
      {/* {done && <p>Thanks for contacting me!</p>} */}
    </section>
  );
};

export default Contact;
