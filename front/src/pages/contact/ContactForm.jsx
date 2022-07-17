import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


export const ContactUs = () => {
    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('gmail', 'spoted_template', form.current, 'm5NlXKGVsmW7brBVg')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };
  
    return (
      <form className="contact_form" ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    );
  };

    export default ContactUs;



