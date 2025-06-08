import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse , ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

import { AuthorizationGuard } from 'src/guards/authorization/authorization.guard';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from 'src/decorator/enum/role.enum';
 @ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get('dashboard-summary')
  @ApiOperation({ summary: 'Get dashboard summary' })
  @ApiResponse({ status: 200, description: 'Dashboard summary retrieved successfully.' })
  DashboardSummary() {
    return this.dashboardService.dashboard();
  }

  
}
