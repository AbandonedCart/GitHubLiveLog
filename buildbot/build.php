<!DOCTYPE html>
<html>
<head>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">
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
<title>LiveSnoop Mobile BuildBot</title>
<style>
body {
  -moz-transform: scale(0.75, 0.75); 
  -webkit-transform: scale(0.75, 0.75); 
  -o-transform: scale(0.75, 0.75);
  -ms-transform: scale(0.75, 0.75);
  transform: scale(0.75, 0.75); 
  -moz-transform-origin: top left;
  -webkit-transform-origin: top left;
  -o-transform-origin: top left;
  -ms-transform-origin: top left;
  transform-origin: top left;
}
</style>
</head>
<body>
<?php

function disable_ob() {
    // Turn off output buffering
    ini_set('output_buffering', 'off');
    // Turn off PHP output compression
    ini_set('zlib.output_compression', false);
    // Implicitly flush the buffer(s)
    ini_set('implicit_flush', true);
    ob_implicit_flush(true);
    // Clear, and turn off output buffering
    while (ob_get_level() > 0) {
        // Get the curent level
        $level = ob_get_level();
        // End the buffering
        ob_end_clean();
        // If the current level has not changed, abort
        if (ob_get_level() == $level) break;
    }
    // Disable apache output buffering/compression
    if (function_exists('apache_setenv')) {
        apache_setenv('no-gzip', '1');
        apache_setenv('dont-vary', '1');
    }
}

    disable_ob();
    $cmd = "sudo -u USERNAME service privacast ".$_POST['email']." ".$_POST['repo']." ".$_POST['branch'];
    $descriptorspec = array(
       0 => array("pipe", "r"),   // stdin is a pipe that the child will read from
       1 => array("pipe", "w"),   // stdout is a pipe that the child will write to
       2 => array("pipe", "w")    // stderr is a pipe that the child will write to
    );
    flush();
    $process = proc_open($cmd, $descriptorspec, $pipes, realpath('./'), array());
    echo "<pre>";
    if (is_resource($process)) {
        while ($s = fgets($pipes[1])) {
            print $s;
            flush();
        }
        while ($e = fgets($pipes[2])) {
            print $e;
            flush();
        }
    }
    echo "</pre>";
    echo "<script type=\"text/javascript\">document.location.href=\"./".$_POST['email']."\";</script>";
?>
</body>
</html>