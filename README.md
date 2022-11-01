THE FOLLOWING REPOSITORY IS A SIMPLE IMPLMENETATION OF A CAMERA APP. THE USER CAN USE HIS WEBCAM , MOBILE CAMERA TO CLICK IMAGES BOTH FRONT AND BACK CAMERA IS POSSIBLE. THE IMAGE IS THEN CONVERTED INTO A PDF FILE AND SENT TO THE EMAIL ADDRESS SPECIFIED BY THE USER. 

FEW POINTS TO REMEMBER BEFORE TESTING THE CODE IMPLEMENTATION / FEATURES INCLUDED : 

1) I have added the flexibility by providing the user a dialog to enter the email address where they desire the photo to be sent.

2) EmailJs package has been used to send the photo clicked as en email. The free plan of EmailJS allows only attachment of up to 500KB to be sent. Therefore it is very important to note that if the photo is taken with a high resolution camera, then the photo will not be sent as an email. This however does not mean that the code is not functioning. It simply is a restriction due to the plan I have purchased of EmailJS.

3) I had planned on adding a feature to allow the user to crop their images immediately after clicking the photos. I have not been able to fully implement it in the codebase. I have however created a reusable component for the same which can be further improved given more time. This is my idea of further improvements to the camera app.

4) I have also added the functionality to allow the user to flip the camera from front camera to back camera and so on. 

5) Validation has been added to the email dialog to only allow valid email addresses. This field is required to send the photo via email. This adds an extra layer of security.
