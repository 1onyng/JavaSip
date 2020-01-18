# [JavaSip](http://java-sip.herokuapp.com/#/)

## Technologies

* MongoDB
* Express 
* React
* NodeJS

## Summary

JavaSip is a yelp clone inspired by our love for finding great tasting coffee. Users can post ratings, comments, and pictures related to their favorite coffee shops. Only coffee shops for Oakland are available at the moment. More Bay Area businesses shall be added shortly... 

Features for this group project were divided out and assigned to team members. I was responsible for the business show page.

<img scr="/frontend/public/images/homepage.png">

## Business Show

Users can view information for a specific coffee shop. The average rating is listed at the top along with the location marked on a Google map. The photos next to the map give a sense of the look and feel for the coffee shop. If a user is logged in, they can click the "Write a Review" button to rate, comment, and post a photo. 

<img scr="/frontend/public/images/business_show.png">

## Express Routing

One of the biggest challenges when working with Express endpoints was building json responses to obtain data that would be maniipulated on the frontend. For example, I needed all reviews for a specific user in order to render total number of photos. The first step was to write a static method to return all reviews given a user id. I then invoked the method in a user route and attached the returned object to a users object, which eventually gets iterated over to give me the total count. 

```javascript
ReviewSchema.statics.getReviewsByAuthorId = function (authorId) {
  return Review.find({ author: authorId })
    .then(reviews => reviews)
    .catch(err => err);
};
```

```javascript
router.get("/", async (req, res) => {
  const usersObj = {};
  const users = await User.find();
  for (let index = 0; index < users.length; index++) {
    const user = users[index].toJSON();
    const reviews = await Review.getReviewsByAuthorId(user._id);
    
    user.reviews = reviews;
    usersObj[user._id] = user
  }
  getImages('profiles').then(avatars => res.json({usersObj, avatars}))
});
```








