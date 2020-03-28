<?php
  if(!empty($_GET['tid'] && !empty($_GET['product'] && !empty($_GET['name']&& !empty($_GET['ward']))))) {
    $GET = filter_var_array($_GET, FILTER_SANITIZE_STRING);

    $tid = $GET['tid'];
    $product = $GET['product'];
    $name = $GET['name'];
    $ward = $GET['ward'];
  } else {
    header('Location: index.html');
  }
?>

<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8">
    <title>HWC Donations Map | Ronald McDonald House Charities South Central Ontario</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=ngJBLm96xn">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=ngJBLm96xn">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=ngJBLm96xn">
    <link rel="manifest" href="/site.webmanifest?v=ngJBLm96xn">
    <link rel="mask-icon" href="/safari-pinned-tab.svg?v=ngJBLm96xn" color="#5bbad5">
    <link rel="shortcut icon" href="/favicon.ico?v=ngJBLm96xn">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css?v=1.15">
    <link rel="stylesheet" href="css/cove8.css" />
    <link rel="canonical" href="success.php">

    <meta property="og:url" content="http://rmhcsco.italktosquirrels.com/hwc_map.html" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="The Happy Wheels Cart is in town!" />
    <meta property="og:description" content="The Happy Wheels Cart, stocked with snacks, drinks, toys and activities, travels room to room to provide a much-needed break for parents and children unable to leave their hospital beds. Donate today to help keep families close, room by room." />
    <meta property="og:image" content="img/heart-sketch.svg" />

</head>

<body onload="initMap()">
    <header class="clearfix">
        <div class="bgBlue">
            <div class="wrapper">
                <ul class="topNav">
                    <li class="link homeLink mobile">
                        <a href="index.html">Home</a>
                    </li>
                    <li class="link mobile"><a class="" href="http://rmhcsco.velocitystudio.com/news-and-events">News & Events</a></li>
                    <li class="link lastlink mobile"><a class="" href="http://rmhcsco.velocitystudio.com/contact-us">Contact Us</a></li>
                    <li class="search mobile">
                        <div class="searchFormBlock">
                            <form id="searchForm" method="get" action="/search" autocomplete="off"><label class="hidden">Search Our Site</label><i class="icon"></i><input type="text" class="search" name="search" placeholder="Search Site"><input type="submit" class="submit" name="submit" value="Search"><input type="reset" class="reset" name="reset" value="Reset"></form>
                        </div><a class="search" href="#">Search</a><button class="search-button center-position"><span class="search-icon"></span></button>
                    </li>
                    <li class="social mobile">
                        <a title="Visit our Twitter Account" class="twitter social" target="_blank" onclick="trackOutboundLink('https://twitter.com/RMHCSCO/');" href="https://twitter.com/RMHCSCO/">Visit our Twitter Account</a>
                    </li>
                    <li class="social mobile">
                        <a title="View our Facebook Page" class="facebook social" target="_blank" onclick="trackOutboundLink('https://www.facebook.com/RMHCSCO/');" href="https://www.facebook.com/RMHCSCO/">View our Facebook Page</a>
                    </li>
                    <li class="social mobile">
                        <a title="View our Instagram Photos" class="instagram social" target="_blank" onclick="trackOutboundLink('https://www.instagram.com/rmhcsco/');" href="https://www.instagram.com/rmhcsco/">View our Instagram Photos</a>
                    </li>
                    <li class="social last mobile">
                        <a title="Watch our YouTube Channel" class="youtube social" target="_blank" onclick="trackOutboundLink('https://www.youtube.com/channel/UCkKSf8Rf00TFKLPkxOxolbQ/');" href="https://www.youtube.com/channel/UCkKSf8Rf00TFKLPkxOxolbQ/">Watch our YouTube Channel</a>
                    </li>
                    <li><a class="bgYellow txtColBrown navLink center" href="http://rmhcsco.velocitystudio.com/volunteer/benefits">Volunteer</a></li>
                    <li><a class="bgRed txtColWhite navLink center" href="hwc_donate.html">Donate Now</a></li>
                </ul>
            </div>
        </div>

    </header>

    <!-- COVE 8 MAIN CONTENT -->
    <!-- MAIN HEADER -->
  </div>
    <section>
        <div class="wrapper">
            <div class="wysPageContent headerPadding">
                <h2 style="text-align: center;">Thank you for Donation, <?php echo $name ?>!</h2>
                <p class="introParagraph" style="text-align: center;">Your transaction ID is:</br> <?php echo $tid; ?></p>
                <ul class="share horizontal">
                    <li><a class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frmhcsco.italktosquirrels.com%2Fhwc_map.html&amp;src=sdkpreparse" target="_blank">Share with Facebook</a></li>
                    <li class="text"><span>Share</span></li>
                </ul>
                <hr class="gold" />
            </div>
        </div>
    </section>
    <!-- </section> -->
    <!-- LIVE MAP -->
    <section>
        <div id="map_wrapper">
            <div class="donationsBar">
                <ul>
                    <li class="wardRankings">
                        <h1><span>Ward Rankings</span></h1>
                    </li>
                    <li>
                        <h1><span id="total_donation_amount"></span></h1>
                    </li>
                    <li>
                        <h1><span id="top_ward"></span></h1>
                    </li>
                    <li>
                        <h1><span id="total_donations"></span></h1>
                    </li>
                </ul>
                <ul>
                    <li class="wardRankings"></li>
                    <li>Total Donated</li>
                    <li>Top Ranking District</li>
                    <li>Total Happy Wheels Donations</li>
                </ul>
            </div>
            <div class="sidebar_wrapper">
                <ul class="sidebar"></ul>
            </div>
            <div id="map"></div>
        </div>
        <div class="wysPageContent" style="margin-top: 70px;">
            <ul class="share horizontal">
                <li><a class="facebook" href="http://www.facebook.com/sharer/sharer.php?u={FACEBOOKSHAREURL}" target="_blank">Share with Facebook</a></li>
                <li class="text"><span>Share</span></li>
            </ul>
            <hr class="gold" />
        </div>

    </section>
    <!-- </section> -->

    <!-- COVE 8 END -->
    <!-- COVE 8 END -->
    <!-- COVE 8 END -->

    <!-- VOLUNTEER / DONATION -->
    <section class="volunteerDonation">
        <div class="wrapper">
            <ul>
                <li class="left">
                    <h5><span>Become a</span> Volunteer</h5>
                    <a class="" href="http://rmhcsco.velocitystudio.com/volunteer/benefits">click here to find our more information about Volunteer</a>
                </li>
                <li class="bgYellow">
                    <div class="middle">
                        <p>your support can</p>
                        <h5>Keep Families Close</h5>
                        <p>
                            <img class="arrowChalk" src="img/arrow-left-chalk.svg"><img class="arrowChalk" src="img/arrow-right-chalk.svg">
                        </p>
                    </div>
                </li>
                <li class="right">
                    <h5><span>Make a</span> Donation</h5>
                    <a class="" href="http://rmhcsco.velocitystudio.com/donate">click here to learn about how to Donate</a>
                </li>
            </ul>
        </div>
    </section><!-- NEWSLETTER -->
    <section class="newsletterContainer">
        <div class="wrapper">
            <div class="newsletterContainer">
                <h5>Our House Insider Newsletter</h5>
                <p class="intro">Sign up for our e-newsletter to read inspiring stories from our families and keep up to date with Ronald McDonald House Charities<sup>&reg;</sup> South Central Ontario news.</p>
                <div class="response"></div>
                <form id="formNewsletter" class="form formNewsletter" method="post" action="" autocomplete="off">
                    <fieldset>
                        <legend class="hidden">Newsletter Contact Information</legend>
                        <ul>
                            <li class="outdent">
                                <label for="newsletterFullName" class="hidden">Name<abbr title="required">*</abbr></label>
                                <input id="newsletterFullName" class="text" type="text" name="newsletterFullName" value="" placeholder="Enter your name">
                            </li>
                            <li class="outdent">
                                <label for="newsletterEmail" class="hidden">Email Address<abbr title="required">*</abbr></label>
                                <input id="newsletterEmail" class="text" type="email" name="newsletterEmail" value="" placeholder="Enter your email address">
                            </li>
                            <li class="buttonNewsletter">
                                <button class="btnSubmit bgYellow txtColBrown hoverBgRed hoverTxtWhite">Subscribe</button>
                            </li>
                        </ul>
                    </fieldset>
                </form>
            </div>
        </div>
    </section>
    <footer>
        <div class="wrapper">

            <ul class="footerNav">
                <li>
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/about-us/how-we-help">About Us</a></h6>
                    <ul class="footerNavMinerMenu">
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/about-us/how-we-help">How We Help</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/about-us/our-staff">Our Staff</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/about-us/our-families">Our Families</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/about-us/board-of-directors">Board of Directors</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/about-us/reports">Reports</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/about-us/career-opportunities">Career Opportunities</a></li>
                    </ul>
                </li>
                <li>
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/staying-with-us/how-can-i-stay-here">Staying With Us</a></h6>
                    <ul class="footerNavMinerMenu">
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/staying-with-us/how-can-i-stay-here">How Can I Stay Here?</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/staying-with-us/what-you-should-know">What You Should Know</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/staying-with-us/family-services">Family Services</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/staying-with-us/house-facilities">House Facilities</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/staying-with-us/house-tour">House Tour</a></li>
                    </ul>
                </li>
                <li>
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help">Ways To Help</a></h6>
                    <ul class="footerNavMinerMenu">
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/donate">Make A Donation</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help/meals-that-heal">Meals That Heal</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help/monthly-planned-and-sustainable-giving">Monthly, Planned, & Sustainable Giving</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help/community-involvement-and-events">Community Involvement & Events</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help/corporate-partnerships">Corporate Partnerships</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help/donate-a-car-canada">Donate A Car Canada</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help/fundscrip">Fundscrip</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help/online-wishlist">Online Wishlist</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help/host-a-gift-card-drive">Host A Gift Card Drive</a></li>
                    </ul>
                </li>
                <li>
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/volunteer/benefits">Volunteer</a></h6>
                    <ul class="footerNavMinerMenu">
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/volunteer/benefits">Benefits</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/volunteer/individual-volunteer-opportunities">Individual Volunteer Opportunities</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/volunteer/group-volunteer-opportunities">Group Volunteer Opportunities</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/volunteer/apply-today">Apply Today</a></li>
                    </ul>
                </li>
                <li>
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/our-family-rooms">Our Family Rooms</a></h6>
                </li>
                <li>
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/donate">Donate</a></h6>
                    <ul class="footerNavMinerMenu">
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/donate/in-honour-in-memory-donation">In Honour/ In Memory Donation</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/donate/corporate-business-donation">Corporate / Business Donation</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/donate/individual-general-donation">Individual / General Donation</a></li>
                        <li><a class="" href="http://rmhcsco.velocitystudio.com/donate/become-a-monthly-donor">Become A Monthly Donor</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="footerLastNav">
                <li class="mobileLIHide">
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/news-and-events">News & Events</a></h6>
                </li>
                <li class="desktopLIHide">
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/ways-to-help">Ways To Help</a></h6>
                </li>
                <li>
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/contact-us">Contact Us</a></h6>
                </li>
                <li class="desktopLIHide">
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/staying-with-us/how-can-i-stay-here">Staying With Us</a></h6>
                </li>
                <li>
                    <h6><a class="" href="http://rmhcsco.velocitystudio.com/privacy-policy">Privacy Policy</a></h6>
                </li>
                <li>
                    <ul class="social">
                        <li>
                            <h6>
                                Follow Us:
                            </h6>
                        </li>
                        <li>
                            <a class="twitter" target="_blank" onclick="trackOutboundLink('https://twitter.com/RMHCSCO/');" href="https://twitter.com/RMHCSCO/">Twitter</a>
                        </li>
                        <li>
                            <a class="facebook" target="_blank" onclick="trackOutboundLink('https://www.facebook.com/RMHCSCO/');" href="https://www.facebook.com/RMHCSCO/">Facebook</a>
                        </li>
                        <li>
                            <a class="instagram" target="_blank" onclick="trackOutboundLink('https://www.instagram.com/rmhcsco/');" href="https://www.instagram.com/rmhcsco/">Instagram</a>
                        </li>
                        <li>
                            <a class="youtube" target="_blank" onclick="trackOutboundLink('https://www.youtube.com/channel/UCkKSf8Rf00TFKLPkxOxolbQ/');" href="https://www.youtube.com/channel/UCkKSf8Rf00TFKLPkxOxolbQ/">YouTube</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="copyrightAuthor clearfix">
                <p class="photo"><img src="css/images/logo-house-rmhcswo.svg"></p>
                <div class="details">
                    <small>&copy; 2019 McDonald's<br>
                        The following trademarks used herein are owned by McDonald's Corporation and its affiliates; McDonald's, Ronald McDonald House Charities, Ronald McDonald House Charities Logo, RMHC, Ronald McDonald House, Ronald McDonald Family Room, and Ronald McDonald Care Mobile<br>Charitable Registration #13277 9836 RR0001</small>
                    <p class="author">Site created by <a target="_blank" href="http://www.velocitystudio.com/">Velocity Studio</a></p>
                </div>
            </div>
        </div>
    </footer>
    <script src="js/vendor/modernizr-3.7.1.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script>
        window.jQuery || document.write('<script src="/js/vendor/jquery-3.4.1.min.js"><\/script>');
    </script>
    <!-- COVE 8 JAVASCRIPT -->
    <script src="js/cove8JS.js"></script>
    <script type="text/javascript" src="https://maps.google.com/maps/api/js?key=AIzaSyAQhr3pRpEJWWDruahwCMniTkJWx363U1k&sensor=false"></script>
    <script type="text/javascript" src="js/map.js"></script>
    <!-- END -->
    <script src="js/plugins.js"></script>
    <script src="js/main.js?v=1.4"></script>
    <script src="js/vendor/jquery.fancybox.min.js"></script>
    <link rel="stylesheet" href="css/jquery.fancybox.min.css">
    <link rel="stylesheet" href="css/swiper.min.css">
    <script type="text/javascript" src="js/vendor/swiper.min.js"></script>
    <script>
        $(document).ready(function () {});
    </script>
    <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. 
  <script>
    window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
    ga('create', 'UA-XXXXX-Y', 'auto'); ga('set','transport','beacon'); ga('send', 'pageview');
      </script>
  <script src="https://www.google-analytics.com/analytics.js" async></script>-->
</body>

</html>