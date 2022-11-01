import emailjs from "@emailjs/browser";

export const sendEmail = (pdfURL: string, email: string) => {
  emailjs
    .send(
      "gmail",
      "kasheesh",
      { pdfURL: pdfURL, email: email },
      "4AwZYNQkMFKQOSS7z"
    )
    .then(
      result => {
        console.log(result.text);
      },
      error => {
        console.log(error.text);
      }
    );
};
