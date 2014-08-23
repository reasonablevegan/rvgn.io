# To generate secure SSH deploy key for a github repo to be used from Travis
base64 --break=0 ~/.ssh/id_rsa-yttrium > ~/.ssh/id_rsa-yttrium_base64
ENCRYPTION_FILTER="echo \$(echo \"- secure: \")\$(travis encrypt \"\$FILE='\`cat $FILE\`'\" -r floydpink/harimenon.com)"
brew install coreutils 
gsplit --bytes=100 --numeric-suffixes --suffix-length=2 --filter="$ENCRYPTION_FILTER" ~/.ssh/id_rsa-yttrium_base64 id_rsa_
