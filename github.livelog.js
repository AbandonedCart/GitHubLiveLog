var githubLive = function githubLive(account, developer, anchor, project) {

if (project != null && project != "") {
$.ajax({
url: 'https://api.github.com/repos/' + account + '/' + project + '/commits?callback=jsonp',
type: "GET",
            dataType: "jsonp",
            success: function (dbInfo) {
            $.each(dbInfo.data, function (index, data) {
                        var author = this.commit.committer.name;
                        var stamp = this.commit.committer.date.split('T');
                        var date = stamp[0].replace('T', '');;
                        var time = stamp[1].replace('Z', '');
                        var avatar = this.committer.avatar_url;
                        
                            var sha = this.sha;
                            var origin = this.author.login;
                            var apiUrl = this.url;
                            var gitUrl = apiUrl.replace('https://api.github.com/repos', 'https://github.com');
                            var url = gitUrl.replace('commits', 'commit');
                            var title = this.commit.message.split('\n\n', 1);
                            var message = this.commit.message.substring(this.commit.message.indexOf('\n\n') + 1).replace(/\n/g, '<br />');
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
                            var innerItem = $("<h2></h2>");
                            innerItem.html(date + ' ' + time);
                            makeli.append(innerItem);
                            var linksli = $("<p></p>");
                            var output = '<h4><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h4>'
                            + action + ' ' + project + '<br />'
                            + origin
                            + '<a href="' + url + '" target="_blank">' + sha + '</a><br /><br />'
                            + '<b>' + title + '</b><br />'
                            + message + '<br />';
                            linksli.html(output);
                            makeli.append(linksli);
                            $(anchor).append(makeli);
                });
            },
            error: function (status) {
                console.log(status);
            }
        });
} else {
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
                            var innerItem = $("<h2></h2>");
                            innerItem.html(date + ' ' + time);
                            makeli.append(innerItem);
                            var linksli = $("<p></p>");
                            var output = '<h4><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h4>'
                            + action + ' ' + branch + ' at ' + repo + '<br />'
                            + origin
                            + '<a href="' + url + '" target="_blank">' + sha + '</a><br /><br />'
                            + '<b>' + title + '</b><br />'
                            + message + '<br />';
                            linksli.html(output);
                            makeli.append(linksli);
                            submission.push(makeli);
                        });
                        submission.reverse();
                        for (i=0;i<submission.length;i++) {
                            $(anchor).append(submission[i]);
                        }
                    } else if (type == "CommitCommentEvent") {
                        var author = data.actor.login;
                        var stamp = data.payload.comment.created_at.split('T');
                        var date = stamp[0].replace('T', '');;
                        var time = stamp[1].replace('Z', '');
                        var avatar = data.actor.avatar_url;
                        var message = data.payload.comment.body.replace(/\n/g, '<br />');
                        var url = data.payload.comment.html_url;
                        var makeli = $("<div></div>");
                        var innerItem = $("<h2></h2>");
                        innerItem.html(date + ' ' + time);
                        makeli.append(innerItem);
                        var linksli = $("<p></p>");
                        var output = '<h4><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h4>'
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
                       var innerItem = $("<h2></h2>");
                       innerItem.html(date + ' ' + time);
                       makeli.append(innerItem);
                       var linksli = $("<p></p>");
                       var output = '<h4><img src="' + avatar + '" width="40px" style="vertical-align:middle">&nbsp;&nbsp;' + author + '</h4>'
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
    }