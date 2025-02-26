"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface DropdownMenuCheckboxInterface {
    values: string[];
}

export function DropdownMenuCheckbox({values}: DropdownMenuCheckboxInterface) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 h-44 overflow-y-scroll">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {values.map((value) => (
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            {value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
