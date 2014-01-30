GitHubLiveLog
===========
A javascript / native changelog generator for projects hosted on github

Usage
--------------------
The Compiled and Source Reference versions are designed for jQM

If you are not using jQuery Mobile, use the “standard/“ version

Hosting Compiled Versions:

```
<script src="http://loungekatt.github.io/GitHubLiveLog/compile.livelog.js"></script>
<script>
    $(document).ready(function() {
        var builds = new Array ("<?php echo implode('", "', glob("./compiled/*.apk")) ?>");
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME, ’HTML-ANCHOR-ID’, ‘APK-PREFACE’, builds);
    });
</script>
```

Hosting Source References:

```
<script src="http://loungekatt.github.io/GitHubLiveLog/github.livelog.js"></script>
<script>
    $(document).ready(function() {
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME, ’HTML-ANCHOR-ID’);
    });
</script>
```

or

```
<script src="http://loungekatt.github.io/GitHubLiveLog/github.livelog.js"></script>
<script>
    $(document).ready(function() {
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME’, ’HTML-ANCHOR-ID’, ‘PROJECT’);
    });
</script>
```

Hosting Source References (no-conflict):

```
<script src="http://loungekatt.github.io/GitHubLiveLog/standard/noconflict.livelog.js"></script>
<script>
    jQuery(document).ready(function() {
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME, ’HTML-ANCHOR-ID’);
    });
</script>
```

or

```
<script src="http://loungekatt.github.io/GitHubLiveLog/standard/noconflict.livelog.js"></script>
<script>
    jQuery(document).ready(function() {
        githubLive(‘ACCOUNT’,’ORGANIZATION-NAME’, ’HTML-ANCHOR-ID’, ‘PROJECT’);
    });
</script>
```