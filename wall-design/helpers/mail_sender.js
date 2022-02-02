const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  sendMail: (message, name, city) => {
    return new Promise((resolve, reject) => {
      const msg = {
        to: "cvaibhavi2001@gmail.com", // Change to your recipient
        from: {
          name: "wall-design",
          email: "walldesign22@gmail.com",
        },
        subject: "message from users",
        text: message,
        html: `<!DOCTYPEhtml>
                      <html>
                        <body>
                          <h1 style="text-align:center;">Name: ${name}  <br>
                          City: ${city}  </h1><br>
                          <h3 style="text-align:justify;">${message}</h3>
                        </body>
                      </html>`,
      };

      sgMail
        .send(msg)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
