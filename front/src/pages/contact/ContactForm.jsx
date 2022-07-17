import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


export const ContactUs = () => {
    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('gmail', 'spoted_template', form.current, 'm5NlXKGVsmW7brBVg')
        .then((result) => {
            console.log(result.text);
            toast.success("Your message has been sent, thank you !");
        }, (error) => {
            console.log(error.text);
            toast.error("Your message has not been sent, please retry");
        });
        e.target.reset();
    };
  
    return (
      <div className="globalPage">
            <div className="leftSideBar">
            </div>
            <div className="globalPageWrapper">
                <div className="globalPageHeader">
                    <div className="searchBar">
                    </div>
                </div>
                <div className="globalPageWrapperCards">
                <div className="text_infos">
                        <h1>Contact</h1>
                        <h2 className="fade-in">Contact us for all inquiries</h2>
                    </div>
                <form className="formContainer contactForm" ref={form} onSubmit={sendEmail}>
                <div className="form_overlay"></div>
                  
                <div className="form-group">
                  <div className="wrapper-form-group">
                    <label>Firstname</label>
                    <input type="text" name="firstname" required="required" placeholder="firstname" />
                  </div>
                  <div className="wrapper-form-group">
                  <label>LastName</label>
                  <input type="text" name="lastname" required="required" placeholder="lastname" />
                  </div>
                </div>
                <div className="form-group">
                <div className="wrapper-form-group">
                  <label>Email</label>
                  <input type="email" name="email" required="required" placeholder="email" />
                  </div>
                  <div className="wrapper-form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" placeholder="phone number"/>
                  </div>
                </div>
                <div className="form-group">
                <div className="wrapper-form-group" id="subject-field">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="subject" />
                  </div>
                </div>
                <div className="form-group" id="message-field">
                <div className="wrapper-form-group">
                  <label>Message</label>
                  <textarea name="message" required="required" placeholder="Write your message..." />
                  </div>
                </div>
                <div className="form-group">
                  <input type="submit" value="Send" className="submitBtn" />
                </div>
                </form>
                <div className="globalPageWrapperCards_overlay"></div>
                </div>
                <div className="globalFullPaginationContainer">
                </div>
                </div>
            </div>
    );
  };

    export default ContactUs;



