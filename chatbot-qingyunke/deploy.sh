npm run build
cd dist
git add -A
git commit -m "部署"
git push origin master:gh-pages
cd -