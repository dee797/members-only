# Members Only Message Board (Super Forum)

This is a backend project where users can create an account to post messages on a forum. Every post can be viewed on the index page of the website. After creating an account, users can become special members if they enter the (not so secret) passcode, which is: 

cats_are_cool

Members have the unique ability to view the author and date of each post, whereas non-members can't. Anyone can view all posts made on the forum, but only users with an account can create posts. Users can log into their account at any time and stay logged in for 1 day (after that their session cookie expires, thus logging them out).

**Important:** All accounts are stored in a database, and therefore passwords are salted and hashed for security purposes. However, please still exercise best password practices, and choose a complex password that you do **not** use on other sites. Thank you.

This project uses the following technologies:

- Node.js
- Express.js
- PostgreSQL
- Tailwind CSS
- EJS

Visit the site at: https://members-only-amlg.onrender.com

** Note: The app goes to sleep after 15 minutes of activity, so it may take up to a minute for it to start up again.
