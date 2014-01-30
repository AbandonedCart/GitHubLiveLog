var githubLive = function githubLive(account, developer, anchor, product, builds) {
        $.ajax({
            url: 'https://api.github.com/users/' + account + '/events?callback=jsonp',
            type: "GET",
            dataType: "jsonp",
            success: function (dbInfo) {
                // console.log(dbInfo);
                $.each(dbInfo.data, function (index, data) {
                    var type = data.type;
                    var repo = data.repo.name.replace(account + "/", '');
                    if (type == "PushEvent") {
                        var author = data.actor.login;
                        var stamp = data.created_at.split('T');
                        var date = stamp[0].replace('T', '');;
                        var time = stamp[1].replace('Z', '');
                        var avatar = data.actor.avatar_url;
                        var commits = data.payload.commits;
                        var branch = data.payload.ref.replace('refs/heads/', '');
                        var submission = new Array();
                        $.each(commits, function (index, single) {
                            var sha = single.sha;
                            var origin = single.author.name;
                            var apiUrl = single.url;
                            var gitUrl = apiUrl.replace('https://api.github.com/repos', 'https://github.com');
                            var url = gitUrl.replace('commits', 'commit');
                            var title = single.message.split('\n\n', 1);
                            var message = single.message.substring(single.message.indexOf('\n\n') + 1).replace(/\n/g, '<br />');
                            var action = 'Pushed to';
                            if (author != origin) {
                                origin = author + ' <- [ ' + origin + ' ]<br />';
                                action = 'Picked for';
                            } else {
                                origin = '';
                            }
                            if (title == message) {
                                message = '';
                            }
                            var makeli = $("<div></div>");
                            var innerItem = $("<h4></h4>");
                            innerItem.html(date + ' ' + time);
                            makeli.append(innerItem);
                            var linksli = $("<p></p>");
                            var output = '<h6><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h6>'
                            + action + ' ' + branch + ' at ' + repo + '<br />'
                            + origin
                            + '<a href="' + url + '" target="_blank">' + sha + '</a><br /><br />'
                            + '<b>' + title + '</b><br />'
                            + message + '<br />';
                            linksli.html(output);
                            makeli.append(linksli);
                            var hash = sha.substring(0,7);
                            if (builds.indexOf('./compiled/' + product + '-' + hash + '.apk') != "-1") {
                               var ref = builds.indexOf('./compiled' + product + '-' + hash + '.apk');
                               var build = "<button onclick='javascript:window.location.href=\"" + builds[ref] + "\";' data-icon='star' data-iconpos='right'>Download this build</button>";
                               makeli.append(build);
                            }
                            submission.push(makeli);
                        });
                        submission.reverse();
                        for (i=0;i<submission.length;i++) {
                            $(anchor).append(submission[i]);
                        }
                    } else if (type == "PullRequestEvent") {
                       var number = data.payload.number;
                       var sha = data.payload.pull_request.merge_commit_sha;
                       var author = data.payload.pull_request.user.login;
                       var stamp = data.payload.pull_request.created_at.split('T');
                       var date = stamp[0].replace('T', '');;
                       var time = stamp[1].replace('Z', '');
                       var avatar = data.payload.pull_request.user.avatar_url;
                       var title = data.payload.pull_request.title.split('\n\n', 1);
                       var message = data.payload.pull_request.title.substring(data.payload.pull_request.title.indexOf('\n\n') + 1).replace    (/\n/g, '<br />');
                       if (title == message) {
                       message = '';
                       }
                       var url = data.payload.pull_request.html_url;
                       var makeli = $("<div></div>");
                       var innerItem = $("<h4></h4>");
                       innerItem.html(date + ' ' + time);
                       makeli.append(innerItem);
                       var linksli = $("<p></p>");
                       var output = '<h6><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h6>'
                       + 'Submitted Pull #' + number + ' for ' + developer + '<br />'
                       + '<a href="' + url + '" target="_blank">' + sha + '</a><br /><br />'
                       + title + '<br />';
                       linksli.html(output);
                       makeli.append(linksli);
                       $(anchor).append(makeli);
                    } else if (type == "CommitCommentEvent") {
                        var author = data.actor.login;
                        var stamp = data.payload.comment.created_at.split('T');
                        var date = stamp[0].replace('T', '');;
                        var time = stamp[1].replace('Z', '');
                        var avatar = data.actor.avatar_url;
                        var message = data.payload.comment.body.replace(/\n/g, '<br />');
                        var url = data.payload.comment.html_url;
                        var makeli = $("<div></div>");
                        var innerItem = $("<h4></h4>");
                        innerItem.html(date + ' ' + time);
                        makeli.append(innerItem);
                        var linksli = $("<p></p>");
                        var output = '<h6><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h6>'
                        + 'Left a comment on ' + developer + '<br />'
                        + '<a href="' + url + '" target="_blank">View original GitHub comment</a><br /><br />'
                        + message + '<br />';
                        linksli.html(output);
                        makeli.append(linksli);
                        $(anchor).append(makeli);
                    }  else if (type == "IssueCommentEvent") {
                       var author = data.actor.login;
                       var stamp = data.payload.comment.created_at.split('T');
                       var issue = data.payload.issue.title;
                       var date = stamp[0].replace('T', '');;
                       var time = stamp[1].replace('Z', '');
                       var avatar = data.actor.avatar_url;
                       var message = data.payload.comment.body.replace(/\n/g, '<br />');
                       var url = data.payload.comment.html_url;
                       var makeli = $("<div></div>");
                       var innerItem = $("<h4></h4>");
                       innerItem.html(date + ' ' + time);
                       makeli.append(innerItem);
                       var linksli = $("<p></p>");
                       var output = '<h6><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h6>'
                       + 'Left a comment on ' + issue + '<br />'
                       + '<a href="' + url + '" target="_blank">View original GitHub comment</a><br /><br />'
                       + message + '<br />';
                       linksli.html(output);
                       makeli.append(linksli);
                       $(anchor).append(makeli);
                    }
                });
            },
            error: function (status) {
                console.log(status);
            }
        });
    };