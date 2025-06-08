import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { CommentService, CommentWithReplies, } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from 'src/decorator/enum/role.enum';
import { AuthorizationGuard } from 'src/guards/authorization/authorization.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  @ApiBearerAuth()
@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiOperation({ summary: 'Add a new comment to a post' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })

  @UseGuards(AuthenticationGuard)
  @Post("add/:postid")
  addcomment(@Body() createCommentDto: CreateCommentDto, @Param('postid') postid: string, @Req() req: any) {
    return this.commentService.addcomment(createCommentDto, req.user.userId, postid);
  }

  @ApiOperation({ summary: 'Retrieve all comments' })
  @ApiResponse({ status: 200, description: 'Return all comments with nested replies.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get("all")
  getAllcomments(): Promise<CommentWithReplies[]> {
    return this.commentService.getAllComments();
  }

  @ApiOperation({ summary: 'Retrieve comments by post ID' })
  @ApiResponse({ status: 200, description: 'Return comments for the specified post ID.' })
  @Get(':postid')
  getcommentByPostID(@Param('postid') id: string) {
    return this.commentService.getcommentByPostID(id);
  }

  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Delete(':id')
  deletecomment(@Param('id') id: string) {
    return this.commentService.deletecomment(id);
  }
}
