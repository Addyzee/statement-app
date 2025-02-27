"use client";
import * as React from "react";
import { Virtuoso } from "react-virtuoso";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuCheckboxInterface {
  values: string[];
}

export function DropdownMenuCheckbox({
  values,
}: DropdownMenuCheckboxInterface) {
  const memoizedValues = React.useMemo(() => ["All", ...values], [values]);
  
  const [checkedItems, setCheckedItems] = React.useState<Map<string, boolean>>(() => {
    const initialMap = new Map();
    memoizedValues.forEach((val) => initialMap.set(val, true));
    return initialMap;
  });
  
  const [open, setOpen] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  
  // Calculate if "All" should be checked
  React.useEffect(() => {
    const regularItemsCount = values.length;
    let checkedRegularItemsCount = 0;
    
    checkedItems.forEach((checked, key) => {
      if (checked && key !== "All") {
        checkedRegularItemsCount++;
      }
    });
    
    // All items checked except "All"
    if (checkedRegularItemsCount === regularItemsCount && !checkedItems.get("All")) {
      setCheckedItems(prev => {
        const newMap = new Map(prev);
        newMap.set("All", true);
        return newMap;
      });
    } 
    // Not all regular items are checked but "All" is checked
    else if (checkedRegularItemsCount < regularItemsCount && checkedItems.get("All")) {
      setCheckedItems(prev => {
        const newMap = new Map(prev);
        newMap.set("All", false);
        return newMap;
      });
    }
  }, [checkedItems, values.length]);
  
  // Filter values based on search term
  const filteredValues = React.useMemo(() => {
    if (!searchTerm) return memoizedValues;
    
    const results = ["All"];
    values.forEach(value => {
      if (value.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(value);
      }
    });
    
    return results.length > 1 ? results : memoizedValues;
  }, [searchTerm, memoizedValues, values]);
  
  // Count selected items (excluding "All")
  const selectedCount = React.useMemo(() => {
    let count = 0;
    checkedItems.forEach((checked, key) => {
      if (checked && key !== "All") {
        count++;
      }
    });
    return count;
  }, [checkedItems]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          Accounts{selectedCount == values.length ? ": All" : selectedCount > 0 ? `: ${selectedCount}` : ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="p-2">
          <input 
            type="text" 
            onChange={handleSearchChange}
            value={searchTerm}
            placeholder="Search accounts..."
            className="w-full p-1"
          />
        </div>
        <DropdownMenuSeparator />
        <div className="h-44">
          <Virtuoso
            style={{ height: "165px" }}
            data={filteredValues}
            itemContent={(_, value) => (
              <DropdownMenuCheckboxItem
                key={value}
                checked={checkedItems.get(value) || false}
                onCheckedChange={(checked) => {
                  if (value === "All") {
                    // When "All" is toggled, update all items
                    const newCheckedItems = new Map();
                    memoizedValues.forEach(val => {
                      newCheckedItems.set(val, !!checked);
                    });
                    setCheckedItems(newCheckedItems);
                  } else {
                    // When an individual item is toggled
                    setCheckedItems(prev => {
                      const newMap = new Map(prev);
                      newMap.set(value, !!checked);
                      return newMap;
                    });
                  }
                }}
              >
                {value}
              </DropdownMenuCheckboxItem>
            )}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}