git reset 084361fa70f5bf4c13f494ecdf405e00dd4f8529
rm -rf static lib *.js
mv build/* .
git add .
git commit -m "Deploy"
git push -f
git checkout master
