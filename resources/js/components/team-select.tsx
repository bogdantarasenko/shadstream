'use client';
import React from 'react';
import { router } from '@inertiajs/core';
import { ChevronsUpDown } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { PageProps, Team } from '@/types';

export function TeamSelect() {
  const { isMobile } = useSidebar();
  const page = usePage<PageProps>();

  const teams = page.props.auth.user?.all_teams;
  const currentTeam = page.props.auth.user?.current_team!;
  const canCreateTeams = true; //page.props.auth.user?.canCreateTeams!;

  function switchToTeam(team: Team) {
    router.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  // If currentTeam is undefined, return null or a fallback UI
  if (!currentTeam) {
    return null; // or return a placeholder component
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={currentTeam.logo} alt={currentTeam.name} /> */}
                <AvatarFallback className="rounded-lg">
                  {currentTeam.name
                    ? currentTeam.name.slice(0, 2).toUpperCase()
                    : 'NA'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentTeam.name || 'No Team'}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={currentTeam.logo} alt={currentTeam.name} /> */}
                  <AvatarFallback className="rounded-lg">
                    {currentTeam.name
                      ? currentTeam.name.slice(0, 2).toUpperCase()
                      : 'NA'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {currentTeam.name || 'No Team'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {teams && teams.length > 0 ? (
                teams.map(team => (
                  <DropdownMenuItem asChild>
                    <SidebarMenuButton
                      size="lg"
                      onClick={() => switchToTeam(team)}
                      className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        {/* <AvatarImage src={currentTeam.logo} alt={currentTeam.name} /> */}
                        <AvatarFallback className="rounded-lg">
                          {team.name
                            ? team.name.slice(0, 2).toUpperCase()
                            : 'NA'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {team.name || 'No Team'}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No teams available</DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              {/* <!-- Team Settings --> */}
              <Link href={`/teams/${page.props.auth.user?.current_team?.id}`}>
                Team Settings
              </Link>
            </DropdownMenuItem>
            {canCreateTeams ? (
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/teams/create">
                  {/* Add an icon if you like */}
                  Create New Team
                </Link>
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
