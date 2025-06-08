import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { CommentService, CommentWithReplies, } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from 'src/decorator/enum/role.enum';
import { AuthorizationGuard } from 'src/guards/authorization/authorization.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }
  @UseGuards(AuthenticationGuard)
  @Post("add/:postid")
  addcomment(@Body() createCommentDto: CreateCommentDto, @Param('postid') postid: string, @Req() req: any) {
    return this.commentService.addcomment(createCommentDto, req.user.userId, postid);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get("all")
  getAllcomments(): Promise<CommentWithReplies[]> {
    return this.commentService.getAllComments();
  }

  @Get(':postid')
  getcommentByPostID(@Param('postid') id: string) {
    return this.commentService.getcommentByPostID(id);
  }


  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Delete(':id')
  deletecomment(@Param('id') id: string) {
    return this.commentService.deletecomment(id);
  }
}
