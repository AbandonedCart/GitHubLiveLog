# Copyright (C) 2013 Lounge Katt

# This script is designed to compliment .bash_profile code to automate the build process by adding a typical shell command such as:
# function buildStar { cd /Users/TwistedZero/Dropbox/StarKissedMod; tools/./compile.sh $1; }
# This script is designed by Lounge Katt for use on MacOSX 10.7 but can be modified for other distributions of Mac and Linux

export UPSTREAM=$DROPBOX_SYSTEM/DreamcastEmu
export APPREPOSI=$DROPBOX_SYSTEM/DreamcastEmu/shell/android
export RELEASED=bin/DreamcastEmu-release.apk
export FULLAPK=DreamcastEmu.apk

cd $UPSTREAM
echo -n `git rev-parse HEAD` > shell/android/assets/build

cd $APPREPOSI
rm -fR $(find . -type d -name crunch|xargs)
android update project -p .

ndk-build -j 4

ant clean release
if [ -e $RELEASED ]; then
tools/zipalign -v 4 $RELEASED $FULLAPK
fi
if [ -e $STARKAPK ]; then
cp -R $FULLAPK $UPSTREAM/$FULLAPK
rm -R $RELEASED
fi
if [ -e $FULLAPK ]; then
rm -R $FULLAPK
fi