# Hotel Bookings

## Abstract

This website is a functional client side booking application for the fictional OverLook Hotel featured in the Stephen King's 'The Shining."  This project leverages test driven development using Mocha and Chai, in addition to fetch API, to retrieve and add data to make live updates to the user interface as well as the backend server.  Lastly, this project follows best practices with regard to semantic HTMl and accessibility.

## Project Specs

The project specs and rubric can be found [here](https://frontend.turing.edu/projects/overlook)

## Illustrated Design Mock-up
<img width="300" alt="hotel bookings wireframes" src="https://user-images.githubusercontent.com/100659793/183789081-acabce26-97f1-478e-be40-33d245917114.jpg">

## Guided Motion Feature
https://user-images.githubusercontent.com/100659793/183789833-4d887b7e-2908-4866-894e-9013fd2db4ae.mov

## Technologies Used
Javascript
HTML
CSS
Mocha and Chai
fetch API to retrieve and add data
Webpack
GitHub & Git
Lighthouse audit

## Setup  

1. On the top right corner of this page, click the Fork button. 
1. Clone down the forked repo. 

### Fork and Clone This Repo

Then install the library dependencies. Run:

```bash or zsh
npm install
```

To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see the Login page that says "Welcome to the Overlook Hotel". If that's the case, you're good to go. 

After you run `npm start`

You will see a bunch of lines output to your terminal. One of those lines will be something like:

```bash or zsh
Project is running at http://localhost:8080/
```

Go to `http://localhost:8080/` in your browser to view this project running in the browser.

Enter `control + c` in your terminal to stop the server at any time.

### You will also need this repo to run the backend server that the UI requires to function

Go to this link [here](https://github.com/turingschool-examples/overlook-api)

Read the setup instuctions for this 'overlook-api' README

You will need both hosts running to see the fully functioning website

## Running the test suites

Run the test suite using the command:

```bash or zsh
npm test
```

The test results will output to the terminal.

---

## Challenges

- Date picker element picks date too early when manually typing in the search date
- Verifying customer login credentials needs to be more dynamic

## Future Extensions

- Manager side
- Sort bookings by past and future
- Booking details also give cost for that particular booking
- An "are you sure?" modal to confirm booking before the fetch POST.  Bookings currently happen on 'click'.  
- Verifying customer login credentials needs to be more dynamic
- Error handling if backend server is not running


## Contributors

- Eddie Rodriguez [LinkedIn](https://www.linkedin.com/in/edward-rodriguez-1b497423b/) [GitHub](https://github.com/edjrodriguez)
