export const resetPassword = (email, payload) => {
  return `
    <html>
    <head>
        <style>
        p {
            font-size: 13px;
        }
        .text {
            color: #bf18bf;
            font-weight: 700;
            font-size: 14px;
        }
        .link {
            color: #fff;
            font-weight: 600;
            font-size: 16px;
            background: #bf18bf;
            padding: 6px 14px;
        }
        </style>
    </head>
    <body>
        <p>Hi ${email},</p>
        <p>You requested a password reset from <span class="text">GPChest</span> your trusted gold store.</p>
        <p>If you did not initiate this, please kindly ignore.</p>
        <p> But if you did initiate this, please click the link below to reset your password</p>
        <a class="link" href="https://${payload.link}">Reset Password</a>
    </body>
    </html>
    `;
};

export const confirmReset = (email) => {
  return `
  <html>
  <head>
      <style>

      </style>
  </head>
  <body>
      <p>Hi ${email},</p>
      <p>Your <span className="bold">GPChest</span> login password has been successfully changed.</p>
  </body>
</html>
    `;
};

export const orderNotify = (email, payload) => {
  return `
  <html>
  <head>
      <style>
      p {
        text-align: center;
      }
.bold {
    font-weight: 600;
}

h2 {
    color: #bf18bf;
    text-align: center;
}


      </style>
  </head>
  <body>
  <h2>New Order</h2>
      <p>Order placed by <span class="bold">${email}</span></p>
      <p>Order Id: <span class="bold">${payload.orderId}</span></p>
      <p>Total Price: $<span class="bold">${payload.total}</span></p>
  </body>
</html>
    `;
};
