import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from 'src/decorator/enum/role.enum';
import { AuthorizationGuard } from 'src/guards/authorization/authorization.guard';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
  @ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Post("create")
  @ApiOperation({ summary: 'Create a new post' })

  @ApiResponse({ status: 201, description: 'The post has been successfully created.' })
  create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postService.CreatePost(createPostDto, req.user.userId);
  }

  @Get("posts")
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'The posts have been successfully retrieved.' })
  getallposts(@Query('status') status: string, @Query('page') page: number) {
    return this.postService.getAllPost(status, page);
  }

  @UseGuards(AuthenticationGuard)
  @Post('increment-views/:id')

  @ApiOperation({ summary: 'Increment the views of a post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully updated.' })
  incrementViews(@Param('id') id: string) {
    return this.postService.incrementViews(id);
  }

  @UseGuards(AuthenticationGuard)
  @Post('increment-likes/:id')

  @ApiOperation({ summary: 'Increment the likes of a post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully updated.' })
  incrementLikes(@Param('id') id: string) {
    return this.postService.incrementLikes(id);
  }

  @UseGuards(AuthenticationGuard)
  @Put(':id')

  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully updated.' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: any) {

    return this.postService.updatePost(id, updatePostDto, req.user.userId);
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')

  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.postService.deletePost(id, req.user.userId);
  }

  @Get('with-slug')
  @ApiOperation({ summary: 'Get a post by slug' })
  @ApiResponse({ status: 200, description: 'The post has been successfully retrieved.' })
  getPostBySlug(@Query('slug') slug: string) {
    return this.postService.getPostByslug(slug);
  }

  @Get('with-tag')
  @ApiOperation({ summary: 'Get posts by tag' })
  @ApiResponse({ status: 200, description: 'The posts have been successfully retrieved.' })
  getPostsByTag(@Query('tag') tag: string) {
    return this.postService.getPostByTag(tag);
  }

  @Get('search')
  @ApiOperation({ summary: 'Get posts by search term' })
  @ApiResponse({ status: 200, description: 'The posts have been successfully retrieved.' })
  getPostsBySearch(@Query('searchTerm') searchTerm: string) {
    return this.postService.getPostBySearch(searchTerm);
  }

  @Get('top-posts')
  @ApiOperation({ summary: 'Get top posts' })
  @ApiResponse({ status: 200, description: 'The posts have been successfully retrieved.' })
  getTopPosts() {
    return this.postService.gettopPosts();
  }
}

