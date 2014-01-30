GitHubLiveLog
===========
A javascript change log generator for hosting projects on github

Usage
--------------------
There are three versions of the script to fit your needs:

Hosting Compiled Versions:

<script src="http://loungekatt.github.io/GitHubLiveLog/compile.livelog.js"></script>
<script>
    $(document).ready(function() {
        var builds = new Array ("<?php echo implode('", "', glob("./compiled/*.apk")) ?>");
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME, ’HTML-ANCHOR-ID’, ‘APK-PREFACE’, builds);
    });
</script>

Hosting Source References:

<script src="http://loungekatt.github.io/GitHubLiveLog/github.livelog.js"></script>
<script>
    $(document).ready(function() {
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME, ’HTML-ANCHOR-ID’);
    });
</script>

or

<script>
    $(document).ready(function() {
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME’, ’HTML-ANCHOR-ID’, ‘PROJECT’);
    });
</script>

Hosting Source References (no-conflict):

<script src="http://loungekatt.github.io/GitHubLiveLog/noconflict.livelog.js"></script>
<script>
    jQuery(document).ready(function() {
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME, ’HTML-ANCHOR-ID’);
    });
</script>

or

<script>
    jQuery(document).ready(function() {
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME’, ’HTML-ANCHOR-ID’, ‘PROJECT’);
    });
</script>