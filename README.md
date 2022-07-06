# NodeSchool Rotterdam - pixelflut express

Used for the [NodeSchool Rotterdam meetup](https://www.meetup.com/nodeschool-rotterdam/events/285991530/)

**PRESENTATION**: [nodeschool reboot.pdf](https://github.com/davidvanleeuwen/nodeschool-pixelflut/files/9053667/nodeschool.reboot.pdf)

### Getting started

To try this out at home, please run the server by using first:

`npm install`

and then:

`npm start`

There are four requests you can do:

- `GET /1` - Getting JSON from the server
- `POST /2` - Posting your `name` which returns an `id`
- `PUT /3` - Flashing a pixel using `x`, `y,` and the `id` from the previous request
- `PUT /4` - Only accepts a `url`, which is used to retreive data from another (ExpressJS) server that returns JSON with: `x`, `y`, `color`, `id`.


### Result

https://user-images.githubusercontent.com/238946/177520911-60939956-3e59-4c83-ae46-ed754fb669ea.mp4

https://user-images.githubusercontent.com/238946/177522320-02467222-114f-4731-a04b-1b16e4318851.mov

