"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuRadioInterface{
    values : string[]
}

export function DropdownMenuRadio({values}: DropdownMenuRadioInterface) {
  const [position, setPosition] = React.useState("All");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" >{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className="h-44 overflow-y-scroll" >
            {values.map((value) => 
            <DropdownMenuRadioItem value={value}>{value}</DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
