import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from 'src/decorator/enum/role.enum';
import { AuthorizationGuard } from 'src/guards/authorization/authorization.guard';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Post("create")
  create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postService.CreatePost(createPostDto, req.user.userId);
  }

  @Get("posts")
  getallposts(@Query('status') status: string, @Query('page') page: number) {
    return this.postService.getAllPost(status, page);
  }
  @UseGuards(AuthenticationGuard)
  @Post('increment-views/:id')
  incrementViews(@Param('id') id: string) {
    return this.postService.incrementViews(id);
  }
  @UseGuards(AuthenticationGuard)
  @Post('increment-likes/:id')
  incrementLikes(@Param('id') id: string) {
    return this.postService.incrementLikes(id);
  }

  @UseGuards(AuthenticationGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: any) {

    return this.postService.updatePost(id, updatePostDto, req.user.userId);
  }
  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.postService.deletePost(id, req.user.userId);
  }

  @Get('with-slug')
  getPostBySlug(@Query('slug') slug: string) {
    return this.postService.getPostByslug(slug);
  }
  @Get('with-tag')
  getPostsByTag(@Query('tag') tag: string) {
    return this.postService.getPostByTag(tag);
  }
  @Get('search')
  getPostsBySearch(@Query('searchTerm') searchTerm: string) {
    return this.postService.getPostBySearch(searchTerm);
  }

  @Get('top-posts')
  getTopPosts() {
    return this.postService.gettopPosts();
  }
}
