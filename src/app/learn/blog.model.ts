export class Blog
{
  constructor(public blogId: number,
              public title: string,
              public tag: string,
              public thumbnailUrl: string,
              public dateWritten: string,
              public linkToArticle: string)
              {

                this.blogId = blogId,
                this.title = title;
                this.tag = tag;
                this.thumbnailUrl = thumbnailUrl;
                this.dateWritten = dateWritten
                this.linkToArticle = linkToArticle;
              }
}
