<div id="articles-app" ng-controller="articlescontroller">
  <div class="article" ng-repeat="article in articles">
    <div class="wrapper">
      <h2>{{article.article.title}}</h2>
      <div class="description">{{article.article.body}}</div>
    </div>
  </div>
</div>
