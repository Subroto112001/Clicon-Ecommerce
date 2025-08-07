exports.RegistrationMailTemplate = (
  fristName,
  VERIFICATION_LINK,
  otp,
  otpExpireTime
) => {
  return `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">🔐 Email Verification Required</h2>

      <p style="font-size: 16px; color: #555;">
        Hi ${fristName},
      </p>

      <p style="font-size: 16px; color: #555;">
        Thank you for registering with <strong>Clicon</strong>.
        To complete your registration, please verify your email address by clicking the button below:
      </p>
      <p style="font-size: 16px; color: #555;">
      Your Otp ${otp}  and your otp will expire in ${otpExpireTime}
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${VERIFICATION_LINK}" style="background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
      </div>

      <p style="font-size: 14px; color: #777;">
        If the button above doesn't work, copy and paste this link into your browser:
        <br />
        <a href="${VERIFICATION_LINK}" style="color: #007bff;">${VERIFICATION_LINK}</a>
      </p>

      <hr style="margin: 30px 0;" />

      <p style="font-size: 14px; color: #999;">
        If you didn't register for this account, please ignore this email or contact our support team.
      </p>

      <p style="font-size: 14px; color: #999;">
        – The Clicon Team
      </p>
    </div>
  </body>
</html>`;
};
