# RescYou
### An all-in-one dashboard to help you and your close ones recover from a disaster

## Demo (Click to watch)

[![RescYou](https://github.com/joncady/call-for-code-rescyou/blob/master/thumbnailRescYou.png)](https://youtu.be/UNO1UrO4zlw)

## Web App

Our deployed web app can be found [here](https://call-for-code-app.mybluemix.net).

## What Our Solution Does

RescYou is a platform which enables people who may be affected by a disaster to store a list of contacts who may need to be checked up on after a disaster. The platform also allows users to assess damage to their homes and belongings and using an AI driven portal to upload images, estimate damages and send out requests for relief organizations to assist, repair and rebuild. Using RescYou, users are able to register their details including contact information (phone numbers, emails) of their loved ones who may be affected by a disaster.  
   
Before a disaster strikes, we use an analytical engine to determine a risk score which allows users to sufficiently prepare for an eventual disaster. We have separate analytical models running on IBM Watson Machine Learning engine based on historical data for 3 types of disasters: Hurricanes, Fires and Earthquakes. Users can determine a risk score by selecting their location and targeted disaster type. Then, a user can enter their phone number and numbers of loved ones who may be in the designated zone. The system also records blood types and whether users would like to volunteer to be blood/organ donors.  

Finally, a user can upload images of their property and belongings as a basis point for damage assessment before a disaster. This user data is stored on IBM cloud hosted MongoDB as well as IBM cloud object storage buckets. After a disaster strikes, the RescYou system can allow a user to check for the safety of their loved ones, by sending a text message or checking online on the platform. The system allows emergency response and relief agencies to quickly determine who may need help, and also allows rapid response of potential blood and organ donors in the area who may be able to assist medical emergencies.   

The SMS engine (powered by Twilio and IBM cloud virtual servers and IBM cloud functions) can also act as an E-911 service which can supplement local emergency contact services that often become overwhelmed due to high call volumes after major disasters. After a disaster has passed, users can take images of their damaged property and possessions and upload these images to contrast with previously uploaded images of the same. The platform encompasses a visual recognition model hosted on IBM Watson which scores the level of damage and therefore allows recovery agencies and insurance to provide accurate estimates for costs to repair and restore the damage.

