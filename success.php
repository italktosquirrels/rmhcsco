<?php
  if(!empty($_GET['tid'] && !empty($_GET['name']&& !empty($_GET['ward'])))) {
    $GET = filter_var_array($_GET, FILTER_SANITIZE_STRING);

    $tid = $GET['tid'];
    // $product = $GET['product'];
    $name = $GET['name'];
   // $ward = $GET['ward'];
    $ward=(int)$GET['ward'];;
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
    <meta property="og:title" content="My Donation Helps Sick Kids in Hamilton." />
    <meta property="og:description" content="The Happy Wheels Cart, stocked with snacks, drinks, toys and activities, travels room to room to provide a much-needed break for parents and children unable to leave their hospital beds. Donate today to help keep families close, room by room." />
    <meta property="og:image" content="img/heart-sketch.svg" />


</head>

<body onload="initMap(<?php echo $ward ?>)">
    <header class="clearfix">
        <div class="bgBlue">
            <div class="wrapper">
                <ul class="topNav">
                    <li class="link homeLink mobile">
                        <a href="index.html">Home</a>
                    </li>
                    <li class="link mobile"><a class="" href="">News & Events</a></li>
                    <li class="link lastlink mobile"><a class="" href="">Contact Us</a></li>
                    <li class="search mobile">
                        <div class="searchFormBlock">
                            <form id="searchForm" method="get" action="/search" autocomplete="off"><label class="hidden">Search Our Site</label><i class="icon"></i><input type="text" class="search" name="search" placeholder="Search Site"><input type="submit" class="submit" name="submit" value="Search"><input type="reset" class="reset" name="reset" value="Reset"></form>
                        </div><a class="search" href="#">Search</a><button class="search-button center-position"><span class="search-icon"></span></button>
                    </li>
                    <li class="social mobile">
                        <a title="Visit our Twitter Account" class="twitter social" target="_blank" onclick="trackOutboundLink('https://twitter.com/RMHCSCO/');" href="">Visit our Twitter Account</a>
                    </li>
                    <li class="social mobile">
                        <a title="View our Facebook Page" class="facebook social" target="_blank" onclick="trackOutboundLink('https://www.facebook.com/RMHCSCO/');" href="">View our Facebook Page</a>
                    </li>
                    <li class="social mobile">
                        <a title="View our Instagram Photos" class="instagram social" target="_blank" onclick="trackOutboundLink('https://www.instagram.com/rmhcsco/');" href="">View our Instagram Photos</a>
                    </li>
                    <li class="social last mobile">
                        <a title="Watch our YouTube Channel" class="youtube social" target="_blank" onclick="trackOutboundLink('https://www.youtube.com/channel/UCkKSf8Rf00TFKLPkxOxolbQ/');" href="">Watch our YouTube Channel</a>
                    </li>
                    <li><a class="bgYellow txtColBrown navLink center" href="">Volunteer</a></li>
                    <li><a class="bgRed txtColWhite navLink center" href="donations.html">Donate</a></li>
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
                <p class="introParagraph" style="text-align: center;">Your transaction ID is:</br><?php echo $tid; ?></p>
                <p class="introParagraph" style="text-align: center;">Check out the top-ranking neighbourhoods. Did yours make the cut? Share with friends to encourage fellow Hamiltonians to donate to sick kids in our city.</p>
                <ul class="share horizontal">
                    <li><a class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frmhcsco.italktosquirrels.com%2Fhappywheelscart_JONS.html&amp;src=sdkpreparse" target="_blank">Share with Facebook</a></li>
                    <li class="text"><span>Share</span></li>
                </ul>
                <hr class="gold" />
            </div>
        </div>
    
    <!-- </section> -->
    <!-- LIVE MAP -->
    <section>
        <div id="map-grid-wrapper" class="donationsBar">
            <div id="ranking-title-map">
                <ul>
                    <li class="wardRankings">
                        <h1><span>Ward Rankings</span></h1>
                    </li>
                </ul>
            </div>
            <div id="total-amount-donated-map">
                <ul>
                    <li>
                        <h1>
                            <span id="total_donation_amount"></span>
                        </h1>
                    </li>
                    <li>Total Donated</li>
                </ul>
            </div>
            <div id="top-district-map">
                <ul>
                    <li>
                        <h1><span id="top_ward"></span></h1>
                    </li>
                    <li>Top Ranking District</li>
                </ul>
            </div>
            <div id="total-donations-map">
                <ul>
                    <li>
                        <h1><span id="total_donated"></span></h1>
                    </li>
                    <li>Total Happy Wheels Donations</li>
                </ul>
            </div>
            <div id="sidebar-col">
                <!-- <div id="sidebar-col-grid">
                    <div class="rank">
                        <h1>1</h1>
                    </div>
                    <div class="ward-name">
                        <p>Ancaster</p>
                    </div>
                    <div class="ward-number">
                        <p>Ward # 10</p>
                    </div>
                    <div class="amount">
                        <p>$5000.00</p>
                    </div>
                </div> -->
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
                    <a class="" href="">click here to find our more
                        information about Volunteer</a>
                </li>
                <li class="bgYellow">
                    <div class="middle">
                        <p>your support can</p>
                        <h5>Keep Families Close</h5>
                        <p>
                            <img class="arrowChalk" src="img/arrow-left-chalk.svg" /><img class="arrowChalk" src="img/arrow-right-chalk.svg" />
                        </p>
                    </div>
                </li>
                <li class="right">
                    <h5><span>Make a</span> Donation</h5>
                    <a class="" href="">click here to learn about how to Donate</a>
                </li>
            </ul>
        </div>
    </section>
    <!-- NEWSLETTER -->
    <section class="newsletterContainer">
        <div class="wrapper">
            <div class="newsletterContainer">
                <h5>Our House Insider Newsletter</h5>
                <p class="intro">
                    Sign up for our e-newsletter to read inspiring stories from our
                    families, keep up to date with Ronald McDonald House South Central
                    Ontario news and stay in touch with your fellow RMH friends and
                    supporters.
                </p>
                <div class="response"></div>
                <form id="formNewsletter" class="form formNewsletter" method="post" action="#" autocomplete="off">
                    <fieldset>
                        <legend class="hidden">Newsletter Contact Information</legend>
                        <ul>
                            <li class="outdent">
                                <label for="newsletterFullName" class="hidden">Name<abbr title="required">*</abbr></label>
                                <input id="newsletterFullName" class="text" type="text" name="newsletterFullName" value="" placeholder="Enter your name" />
                            </li>
                            <li class="outdent">
                                <label for="newsletterEmail" class="hidden">Email Address<abbr title="required">*</abbr></label>
                                <input id="newsletterEmail" class="text" type="email" name="newsletterEmail" value="" placeholder="Enter your email address" />
                            </li>
                            <li>
                                <button class="btnSubmit bgYellow txtColBrown hoverBgRed hoverTxtWhite">
                                    Subscribe
                                </button>
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
                    <h6>
                        <a class="" href="">About Us</a>
                    </h6>
                    <ul class="footerNavMinerMenu">
                        <li>
                            <a class="" href="">How We Help</a>
                        </li>
                        <li>
                            <a class="" href="">Our Staff</a>
                        </li>
                        <li>
                            <a class="" href="">Our Families</a>
                        </li>
                        <li>
                            <a class="" href="">Board of Directors</a>
                        </li>
                        <li>
                            <a class="" href="">Reports</a>
                        </li>
                        <li>
                            <a class="" href="">Career
                                Opportunities</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h6>
                        <a class="" href="">Staying With Us</a>
                    </h6>
                    <ul class="footerNavMinerMenu">
                        <li>
                            <a class="" href="">How Can I Stay
                                Here?</a>
                        </li>
                        <li>
                            <a class="" href="">What You Should
                                Know</a>
                        </li>
                        <li>
                            <a class="" href="">Family Services</a>
                        </li>
                        <li>
                            <a class="" href="">House Facilities</a>
                        </li>
                        <li>
                            <a class="" href="">House Tour</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h6>
                        <a class="" href="">Ways To Help</a>
                    </h6>
                    <ul class="footerNavMinerMenu">
                        <li>
                            <a class="" href="">Make A Donation</a>
                        </li>
                        <li>
                            <a class="" href="">Meals That Heal</a>
                        </li>
                        <li>
                            <a class="" href="">Monthly,
                                Planned, & Sustainable Giving</a>
                        </li>
                        <li>
                            <a class="" href="">Community
                                Involvement & Events</a>
                        </li>
                        <li>
                            <a class="" href="">Corporate
                                Partnerships</a>
                        </li>
                        <li>
                            <a class="" href="">Donate A Car
                                Canada</a>
                        </li>
                        <li>
                            <a class="" href="">Fundscrip</a>
                        </li>
                        <li>
                            <a class="" href="">Online Wishlist</a>
                        </li>
                        <li>
                            <a class="" href="">Host A Gift Card
                                Drive</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h6>
                        <a class="" href="">Volunteer</a>
                    </h6>
                    <ul class="footerNavMinerMenu">
                        <li>
                            <a class="" href="">Benefits</a>
                        </li>
                        <li>
                            <a class="" href="">Individual
                                Volunteer Opportunities</a>
                        </li>
                        <li>
                            <a class="" href="">Group
                                Volunteer Opportunities</a>
                        </li>
                        <li>
                            <a class="" href="">Apply Today</a>
                        </li>
                        <li>
                            <a class="" href="">Awards</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h6>
                        <a class="" href="">Our Family Rooms</a>
                    </h6>
                </li>
                <li>
                    <h6>
                        <a class="" href="">Donate</a>
                    </h6>
                </li>
            </ul>
            <ul class="footerLastNav">
                <li>
                    <h6>
                        <a class="" href="">News & Events</a>
                    </h6>
                </li>
                <li>
                    <h6>
                        <a class="" href="">Contact Us</a>
                    </h6>
                </li>
                <li>
                    <h6>
                        <a class="" href="">Terms & Conditions</a>
                    </h6>
                </li>
                <li>
                    <h6>
                        <a class="" href="">Privacy Policy</a>
                    </h6>
                </li>
                <li>
                    <ul class="social">
                        <li>
                            <h6>
                                Follow Us:
                            </h6>
                        </li>
                        <li>
                            <a class="twitter" target="_blank" onclick="trackOutboundLink('https://twitter.com/RMHCSCO/');" href="">Twitter</a>
                        </li>
                        <li>
                            <a class="facebook" target="_blank" onclick="trackOutboundLink('https://www.facebook.com/RMHCSCO/');" href="">Facebook</a>
                        </li>
                        <li>
                            <a class="instagram" target="_blank" onclick="trackOutboundLink('https://www.instagram.com/rmhcsco/');" href="">Instagram</a>
                        </li>
                        <li>
                            <a class="youtube" target="_blank" onclick="trackOutboundLink('https://www.youtube.com/channel/UCkKSf8Rf00TFKLPkxOxolbQ/');" href="">YouTube</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="copyrightAuthor clearfix">
                <p class="photo">
                    <img src="http://rmhcsco.velocitystudio.com/css/images/logo-house-rmhcswo.svg" />
                </p>
                <div class="details">
                    <small>&copy; 2019 McDonald's<br />
                        The following trademarks used herein are owned by McDonald's
                        Corporation and its affiliates; McDonald's, Ronald McDonald House
                        Charities, Ronald McDonald House Charities Logo, RMHC, Ronald
                        McDonald House, Ronald McDonald Family Room, and Ronald McDonald
                        Care Mobile<br />Charitable Registration #13277 9836 RR0001</small>
                    <p class="author">
                        Site created by
                        <a target="_blank" href="">Velocity Studio</a>
                    </p>
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
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.2.0/dist/confetti.browser.min.js"></script>

    <script type="text/javascript" src="https://maps.google.com/maps/api/js?key=AIzaSyAQhr3pRpEJWWDruahwCMniTkJWx363U1k&sensor=false"></script>
    <script type="text/javascript" src="js/fireworks.js"></script>
    <script type="text/javascript" src="js/animatedMap.js"></script>
    <script type="text/javascript" src="js/geoCode.js"></script>
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