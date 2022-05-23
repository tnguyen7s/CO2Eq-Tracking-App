export class Blog
{
  constructor(public blogId: number,
              public title: string,
              public tag: string,
              public thumbnailUrl: string,
              public summary: string,
              public dateWritten: string)
              {

                this.blogId = blogId,
                this.title = title;
                this.tag = tag;
                this.thumbnailUrl = thumbnailUrl;
                this.summary = summary,
                this.dateWritten = dateWritten
              }
}
