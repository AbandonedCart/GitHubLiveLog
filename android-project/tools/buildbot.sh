# Copyright (C) 2013 Lounge Katt

# This script is designed to compliment .bash_profile code to automate the build process by adding a typical shell command such as:
# function buildStar { cd /Users/TwistedZero/Dropbox/StarKissedMod; tools/./compile.sh $1; }
# This script is designed by Lounge Katt for use on MacOSX 10.7 but can be modified for other distributions of Mac and Linux

if [ -n "$1" ]; then

BUILDREPO=/PATH/TO/buildbot/$1/compiled

export APPREPOSI=/PATH/TO/RESOURCES/$1/shell/android
export RELEASED=bin/PROJECT-release.apk
export FULLAPK=PROJECT_NAME-$2.apk

cd $APPREPOSI
rm -fR $(find . -type d -name crunch|xargs)
/PATH/TO/android-sdk/tools/android update project -p .

/PATH/TO/android-ndk/ndk-build -j 4

ant clean release
if [ -e $RELEASED ]; then
    tools/zipalign -v 4 $RELEASED $FULLAPK
fi
if [ -e $FULLAPK ]; then
    cp -R $FULLAPK $BUILDREPO/$FULLAPK
    rm -R $RELEASED
    rm -R $FULLAPK
fi

fi