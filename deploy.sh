function gh_pages {
  [[ `git ls-remote origin | grep gh-pages` ]] && return
  TMP="/tmp/$(LC_CTYPE=C tr -dc 0-9 < /dev/urandom | head -c 20 | xargs | cat)"
  rsync -qa .git $TMP
  pushd $TMP
    git checkout --orphan gh-pages
    git rm -qrf .
    git commit -qam "" --allow-empty --allow-empty-message
    git push origin gh-pages
  popd
  rm -rf $TMP
}

function dist {
  DIST_DIR=$1
  if [[ ! -d $DIST_DIR/.git ]]; then
    REMOTE_ORIGIN=$(git remote -v | awk '/origin/{print $2}' | sort -u)
    rm -rf $DIST_DIR

    git clone \
      --single-branch \
      --branch=gh-pages \
      --depth=1 $REMOTE_ORIGIN \
      $DIST_DIR
  fi

  rsync -r ./dist/* $DIST_DIR/
}


function deploy {
  DIST_DIR=$1
  MASTER_HEAD_SHA=$(git rev-parse --short HEAD)
  GH_PAGES_HEAD_SHA=$(git rev-parse HEAD)
  TAG_NUMBER=$(git tag | awk -F  "#" '{x=$2>x?$2:x}END{print x+1}' x=1)
  pushd $DIST_DIR
    git add . -A
    git commit -m "Deployed from master: $MASTER_HEAD_SHA"
    git tag -a "Deploy#$TAG_NUMBER" -m "Deployed from master $MASTER_HEAD_SHA to gh-pages $GH_PAGES_HEAD_SHA"

    echo "Pushing code to branch gh-pages..."
    git push origin gh-pages
    echo "Pushing deploy tag..."
    git push origin --tags
  popd
}

DIST_FOLDER="/tmp/$(LC_CTYPE=C tr -dc 0-9 < /dev/urandom | head -c 20 | xargs | cat)"
gh_pages
dist $DIST_FOLDER
deploy $DIST_FOLDER


