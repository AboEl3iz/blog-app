import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

import { AuthorizationGuard } from 'src/guards/authorization/authorization.guard';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from 'src/decorator/enum/role.enum';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get('dashboard-summary')
  DashboardSummary() {
    return this.dashboardService.dashboard();
  }

  
}
