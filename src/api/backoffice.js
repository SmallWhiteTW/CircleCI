import { post, postFile } from ".";

class BackOfficeRequest {
  constructor(tag) {
    this.tag = tag;
  }

  get login() {
    return post.bind(this, this.tag + "/Login");
  }

  get getUserList() {
    return post.bind(this, this.tag + "/GetUserList");
  }

  get updateUserInfo() {
    return post.bind(this, this.tag + "/updateUserInfo");
  }

  get getSportTypes() {
    return post.bind(this, this.tag + "/getSportTypeList");
  }

  get updateSportType() {
    return post.bind(this, this.tag + "/updateSportType");
  }

  get getPlatForms() {
    return post.bind(this, this.tag + "/getPlatFormList");
  }

  get uploadBetRecord() {
    return postFile.bind(this, this.tag + "/uploadBetRecord");
  }

  get getLeagueData() {
    return post.bind(this, this.tag + "/GetSportLeagueList");
  }

  get getArticleList() {
    return post.bind(this, this.tag + "/getArticleList");
  }

  get getArticle() {
    return post.bind(this, this.tag + "/getArticle");
  }

  get updateSportLeague() {
    return post.bind(this, this.tag + "/UpdateSportLeague");
  }

  get getArticleCategoryList() {
    return post.bind(this, this.tag + "/GetArticleCategoryList");
  }

  get updateArticleCategoryList() {
    return post.bind(this, this.tag + "/UpdateArticleCategory");
  }

  get getArticleTagList() {
    return post.bind(this, this.tag + "/GetArticleTagList");
  }

  get updateArticleTag() {
    return post.bind(this, this.tag + "/UpdateArticleTag");
  }

  get updateArticle() {
    return post.bind(this, this.tag + "/UpdateArticle");
  }
}

const backofficeReq = new BackOfficeRequest("BackOffice");

export default backofficeReq;


