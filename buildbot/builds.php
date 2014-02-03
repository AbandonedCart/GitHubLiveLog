<!DOCTYPE HTML>

<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">
<link rel="apple-touch-icon" href="images/iphone.png"/>
<link rel="shortcut icon" href="images/favicon.ico" />
<!--  Mobile viewport optimized: j.mp/bplateviewport -->
<meta name="HandheldFriendly" content="True">
<meta name="MobileOptimized" content="320">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="viewport" content="target-densitydpi=device-dpi" />
<!-- Mobile IE needs ClearType for smoothing fonts -->
<meta http-equiv="cleartype" content="on">
<script type="text/javascript">
    window.scrollTo(0, window.innerHeight);
</script>
<meta charset="UTF-8">
<title>Reicast BuildBot</title>
<script language="javascript" type="text/javascript">
<!--

winWidth = 320; // sets a default width for browsers who do not understand screen.width below
winheight = 480; // ditto for height

if (screen){ // weeds out older browsers who do not understand screen.width/screen.height
    winWidth = screen.width;
    winHeight = screen.height;
}

// this function calls a popupWindow where
// win is the page address i.e. '../page.htm'

function popupWindow(win){
    
    newWindow = window.open(win,'newWin','toolbar=no,location=no,scrollbars=no,resizable=yes,width='+winWidth+',height='+winHeight+',left=0,top=0');
    newWindow.focus();
}
// -->
</script>
<link rel="stylesheet" href="http://twistedumbrella.cloudant.com/comicbuddy/_design/comicbuddy/css/jquery.mobile-1.3.0.min.css" />
<link rel="stylesheet" type="text/css" href="../accordion.css">
</head>
<!-- Begin Container -->
<div data-role="page" id="tabbed">
    <br />
<div id="accordion">
    <h2>PROJECT_NAME Beta</h2>
    <div id="changes" class="pane" style="display:block">
    <p class="style2">Below you will find past compiles performed using the buildbot.</p>
<p><br /></p>
<p><br /></p>
<ul data-role="listview" data-filter="true">
<div data-role="collapsible" data-collapsed="false">
<h1>Reicast Commit Logs</h1>
<p>
<br />
<ul id="changelog" data-role="listview" data-filter="true"></ul>
</p>
</div>
<p><br /></p>
<div data-role="collapsible">
<h1>Reicast Build Archive</h1>
<p>
<br />
<ul id="archive" data-role="listview" data-filter="true">
<?php
    $phpfiles = glob("./compiled/*.apk");
    foreach($phpfiles as $phpfile)
    {
        echo "<button onclick=\"javascript:window.location.href='$phpfile';\" data-icon=\"star\" data-iconpos=\"right\">".basename($phpfile)."</button>";
    }
    ?>
</ul>
</p>
</div>
</ul>
<p><br /></p>
    </div>
<div id="provider">
<a onClick='javascript:window.location.href="http://loungekatt.com";' id="powered"><img src="../loungekatt.png" height=20></a>
</div>
    </div>
    <br />
</div>
<script src="http://twistedumbrella.cloudant.com/comicbuddy/_design/comicbuddy/js/jquery-1.8.2.min.js"></script>
<script src="http://loungekatt.github.io/GitHubLiveLog/compile.livelog.js"></script>
<script src="http://twistedumbrella.cloudant.com/comicbuddy/_design/comicbuddy/js/jquery.mobile-1.3.0.min.js"></script>
<script src="http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js"></script>
<script>
    $(document).ready(function() {
        var builds = new Array ("<?php echo implode('", "', glob("./compiled/*.apk")) ?>");
        githubLive('ACCOUNT','DEVELOPER','#changelog','PROJECT_NAME',builds);
    });
</script>
<script src="http://twistedumbrella.cloudant.com/comicbuddy/_design/comicbuddy/js/data-cache-never-min.js"></script>
</body>
</html>