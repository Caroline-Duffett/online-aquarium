# application

This is an online aquarium app that I made for a class project.

Explanation of the technologies used:
For the development of this app, Express, Mongoose, JavaScript, jQuery, Nodemon, HTML, CSS, RESTful CRUD routes, Method-override, and EJS were used. MongoDB Cloud is being used to store the database and Heroku is being used to deploy the app. For the homepage and animal portion of the app I tried to use Bootstrap, but I did not have the time to learn it and implement it the way I wanted. There is some Bootstrap in there and it looks a little funny.

Approach taken:
I followed along with my notes from class to make this app. The random name Heroku assigned me, inspired the idea “floating-reef-48484”. Since I am not associated with any aquariums, I made one up (Online Aquarium). The purpose of this app is for users to be able to see photos of the animals and learn about them without having to go to the aquarium. It includes a home page, species list page, animal list page, and a page displaying maps of the oceans. If a real aquarium wanted to use this app, it would be great for educational purposes. They could have visitors download the app. As they go through the aquarium, they could create a species entry with the information they learned. Same goes for the animal list page and the animals at the aquarium. I thought this could be a good idea after growing up and going on field trips where I had to fill out packets, why not fill out this information in an app.

To use this app, one must first create and account and login. Once the user is signed in, they can access all pages of the app. This includes forms to create new animals/species, forms to edit animals/species, and a delete function for the animals/species. If users are not signed in, they should not have access to the app. I have some seed data in there so the app is not empty.

I tried my best to relate the two models by following the class markdown but did not have enough time to finish this part. I did relate the data a little bit. The species page will list all the names of the animals of that species. For example, If I create a new Green Turtle entry, its name will appear on the list on the species page. If I delete the Green Turtle, the name will go away. If I edit the name, it will update. I could not figure out how to relate them more than this. So, the user must make a species entry before they can create an animal of that species.

Link to live site: https://floating-reef-48484.herokuapp.com/

Installation Instructions: You should only have to click on the live site link, create an account, and login. I would recommend using Google Chrome as your browser.

Unsolved problems:
I did not have time to relate two models the way I wanted or figure out Bootstrap. I would have liked my Bootstrap header to look better. These things are not cause any issue with the app’s functionality. I could not get split to work on my post (create) route like I did for my put (update) route. I tried many different things (see my graveyard). When you create a new animal and list out its diet, it will display the list on one bullet instead of each thing on its own bullet. If you then go to edit the animal, it gets fixed that way. When the dropdown menu in the aquarium section is opened, and you resize the page, it will remain open instead of starting closed. I could not figure out how to get a message to display that a username is already taken. If you try to create an account with an existing username the account will not be made, but there is nothing to indicate the account wasn’t made. I would have liked to get the message out there so the user is not confused.



Sources - Species Page Photos and Info:

    Atlantic Bottlenose Dolphin Info: https://aqua.org/explore/animals/atlantic-bottlenose-dolphin
    Atlantic Bottlenose Dolphin photo: https://www.britannica.com/animal/common-bottlenose-dolphin
    Photo URL: https://i.imgur.com/YxpfcJL.png

    Giant Pacific Octopus Info: https://aqua.org/explore/animals/giant-pacific-octopus
    Giant Pacific Octopus Photo:https://www.pinterest.com/pin/31736372346345180/
    Photo URL: https://i.imgur.com/y5y0E8G.png

    Scalloped Hammerhead Shark Info: https://www.montereybayaquarium.org/animals/animals-a-to-z/scalloped-hammerhead-shark
    Scalloped Hammerhead Shark Photo:https://www.inaturalist.org/guide_taxa/973871
    Photo URL: https://i.imgur.com/94Ib3vl.png

    Green Turtle Info: https://www.montereybayaquarium.org/animals/animals-a-to-z/green-turtle
    Green Turtle Photo: https://commons.wikimedia.org/wiki/File:Green_Turtle_(Chelonia_mydas)_(6133097542).jpg
    Photo URL: https://i.imgur.com/HP04VSz.png

    Lion's Mane Jellyfish Info: https://www.montereybayaquarium.org/animals/animals-a-to-z/lions-mane-jelly
    Lion's Mane Jellyfish Photo: https://www.montereybayaquarium.org/animals/animals-a-to-z/lions-mane-jelly
    Photo URL: https://i.imgur.com/34pLtta.png

    Lined Seahorse Info: https://aqua.org/explore/animals/lined-seahorse
    Lined Seahorse photo:https://www.barnegatbaypartnership.org/species/lined-seahorse/
    Photo URL: https://i.imgur.com/JgKaAna.png

    Percula Clownfish Info: https://aqua.org/explore/animals/percula-clownfish
    Percula Clownfish photo: https://commons.wikimedia.org/wiki/File:Clown_Anemonfish_Amphiprion_percula.jpg
    Photo URL: https://i.imgur.com/sHMAIZy.png

    Porcupinefish Info: https://aqua.org/explore/animals/porcupinefish
    Porcupinefish photo: https://www.monaconatureencyclopedia.com/diodon-hystrix/?lang=en
    Photo URL: https://i.imgur.com/lNXQriB.png

    Reticulated Whiptail Ray Info: https://aqua.org/explore/animals/reticulated-whiptail-ray
    Reticulated Whiptail Ray Photo: https://www.motosha.com/photo/7537/reticulate-whipray
    Photo URL:https://i.imgur.com/Ngo9aJr.png

    California Moray Info: https://www.montereybayaquarium.org/animals/animals-a-to-z/california-moray
    California Moray Photo: https://www.montereybayaquarium.org/animals/animals-a-to-z/california-moray
    Photo URL: https://i.imgur.com/58HzdEW.png

    Photo not available: https://www.123rf.com/stock-photo/not_available.html?sti=nxn1nh55a9piwt54rf|
    Photo: https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6
    URL: https://i.imgur.com/EXotp4G.png



  Sources - Animal Page Profile images:

    Atlantic Bottlenose Dolphin: https://www.flickr.com/photos/nationalaquarium/5965129472
    URL: https://i.imgur.com/U9LiyPK.png

    Giant Pacific Octopus: https://depts.washington.edu/advis104/2020/06/09/call-to-coast-salish-artists-seattle-aquariums-ocean-pavilion-entry/
    URL: https://i.imgur.com/tdGKCXr.png

    Scalloped Hammerhead Shark: https://m.facebook.com/AquariumofthePacific/photos/have-you-met-our-new-scalloped-hammerhead-shark-check-her-out-in-our-molina-anim/10155547625881806/
    URL: https://i.imgur.com/KczDQKa.png

    Green Turtle: https://www.discovery.com/nature/tank-the-sea-turtle-s-gotcha-day-pictures
    URL: https://i.imgur.com/twaDDuo.png

    Lion's Mane Jellyfish: https://montereybayaquarium.tumblr.com/post/165311795484/young-lions-mane-jellies-are-now-on-exhibit
    URL: https://i.imgur.com/zSvMh4a.png

    Lined Seahorse: https://www.liveaquaria.com/product/285/?pcatid=285
    URL: https://i.imgur.com/fFAFr2D.png

    Percula Clownfish: https://reeffishcenter.shop/clownfish/534-amphiprion-percula-onyx-onyx-true-percula-clownfish.html
    URL: https://i.imgur.com/XrqlL5D.png

    Porcupinefish: https://en.wikipedia.org/wiki/Porcupinefish#/media/File:Diodon_nicthemerus.jpg
    URL:https://i.imgur.com/fn5A57x.png

    Reticulated Whiptail Ray: https://aqua.org/explore/animals/reticulated-whiptail-ray
    URL: https://i.imgur.com/sw3cZUx.png

    California Moray: https://en.wikipedia.org/wiki/California_moray#/media/File:California_moray.jpg
    URL: https://i.imgur.com/ucwqYd2.png

    Small no photo: https://www.123rf.com/stock-photo/not_available.html?sti=nxn1nh55a9piwt54rf|
    URL: https://i.imgur.com/zKVuuKY.png


Sources - Other:

  Login/logout:
    The class markdowns and Casey helped me figure this part out.

  Helped me figure out google maps:
    https://extension.umaine.edu/plugged-in/technology-marketing-communications/web/tips-for-web-managers/embed-map/

  Helped me Figure out bootstrap:
    https://getbootstrap.com/docs/5.2/getting-started/introduction/

  Markdowns, classwork, and homework helped me complete most of this project.
