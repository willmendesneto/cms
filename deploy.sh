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

function heroku {
  DIST_DIR=$1
  MASTER_HEAD_SHA=$(git rev-parse --short HEAD)
  mkdir $DIST_DIR
  pushd $DIST_DIR 
    git init
    git remote add heroku git@heroku.com:mst-cms.git
    git commit -qam "" --allow-empty --allow-empty-message
  popd

  rsync -r ./dist/* $DIST_DIR/

  pushd $DIST_DIR 
    touch index.php
    git add . -A
    git commit -m "CMS to staging"
    git push -f heroku master
  popd
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
  pushd $DIST_DIR
    git add . -A
    git commit -m "Deployed from master: $MASTER_HEAD_SHA"

    echo "Pushing code to branch gh-pages..."
    git push origin gh-pages
  popd
}

DIST_FOLDER="/tmp/$(LC_CTYPE=C tr -dc 0-9 < /dev/urandom | head -c 20 | xargs | cat)"
TARGET=$1

if [ "$TARGET" == "production" ]; then
  gh_pages
  dist $DIST_FOLDER
  deploy $DIST_FOLDER
else
  heroku $DIST_FOLDER
fi
