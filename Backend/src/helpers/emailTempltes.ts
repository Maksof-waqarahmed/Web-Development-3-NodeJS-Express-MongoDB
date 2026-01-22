export const emailTemplates = (userName: string, verifyUrl?: string) => {
    const Welcome = `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Our Ecommerce Store!</title>
</head>

<body style="padding: 1.5rem; text-align: center; background-color: #f0f2f4; font-size: 18px; font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;">

<div style="border-radius: 8px; width: 85%; max-width: 600px; min-width: 300px; background-color: #ffffff; color: #303030; padding: 2rem 2.5rem; margin: auto; margin-top: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

<img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" alt="Ecommerce Logo" style="width: 140px; margin-bottom: 1.5rem;">

<p style="text-align: left; font-size: 16px; line-height: 1.5; font-weight: bold;">
Dear ${userName},
</p>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
Welcome to <strong>Our Ecommerce Store</strong> 🎉  
We’re excited to have you on board!
</p>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
At Our Ecommerce Store, we bring you high-quality products at the best prices.  
From fashion and electronics to home essentials — everything you need is just a click away.
</p>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
🎁 <strong>Special Welcome Offer:</strong><br>
Enjoy <strong>10% OFF</strong> on your first order.  
Use the code <strong>WELCOME10</strong> at checkout.
</p>

<a href="https://your-ecommerce-website.com"
style="display: inline-block; margin: 1.5rem 0; padding: 0.75rem 1.5rem; background-color: #0a3d62; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">
Start Shopping Now
</a>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
Stay connected with us for latest deals & updates:
</p>

<p style="text-align: center; font-size: 16px; line-height: 1.5;">
<a href="#" style="color: #0a3d62; text-decoration: none; margin: 0 0.5rem;">Facebook</a> |
<a href="#" style="color: #0a3d62; text-decoration: none; margin: 0 0.5rem;">Instagram</a> |
<a href="#" style="color: #0a3d62; text-decoration: none; margin: 0 0.5rem;">Twitter</a>
</p>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
Need help? Contact us anytime at
<a href="mailto:support@yourecommerce.com" style="color: #0a3d62; text-decoration: none;">
support@yourecommerce.com
</a>
</p>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
Happy Shopping! 🛒
</p>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
Regards,<br>
<strong>Our Ecommerce Team</strong>
</p>

<hr style="height: 2px; background-color: #0a3d62; border: none; margin: 2rem -2.5rem;">

<p style="text-align: center; font-size: 14px; line-height: 1.5;">
© 2024 Our Ecommerce Store. All rights reserved.
</p>

</div>
</body>
</html>
`
    const VerifyEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Your Email</title>
</head>

<body style="padding: 1.5rem; text-align: center; background-color: #f0f2f4; font-size: 18px; font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;">

<div style="border-radius: 8px; width: 85%; max-width: 600px; min-width: 300px; background-color: #ffffff; color: #303030; padding: 2rem 2.5rem; margin: auto; margin-top: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

<img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" alt="Ecommerce Logo" style="width: 140px; margin-bottom: 1.5rem;">

<p style="text-align: left; font-size: 16px; line-height: 1.5; font-weight: bold;">
Dear \${userName},
</p>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
Thank you for signing up at <strong>Our Ecommerce Store</strong> 🎉  
You're almost ready to start shopping!
</p>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
To complete your registration, please verify your email address by clicking the button below.
</p>

<a href=${verifyUrl} target="_blank"
style="display: inline-block; margin: 1.5rem 0; padding: 0.75rem 1.75rem; background-color: #0a3d62; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px; font-weight: bold;">
Verify Email Address
</a>

<p style="text-align: left; font-size: 15px; line-height: 1.5;">
If you didn’t create an account, you can safely ignore this email.
</p>

<p style="text-align: left; font-size: 16px; line-height: 1.5;">
Regards,<br>
<strong>Our Ecommerce Team</strong>
</p>

<hr style="height: 2px; background-color: #0a3d62; border: none; margin: 2rem -2.5rem;">

<p style="text-align: center; font-size: 14px; line-height: 1.5;">
© 2024 Our Ecommerce Store. All rights reserved.
</p>

</div>
</body>
</html>
`;


    return { Welcome, VerifyEmail }
}