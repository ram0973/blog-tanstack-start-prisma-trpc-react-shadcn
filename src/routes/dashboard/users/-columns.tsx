import type { User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    meta: "Id",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted === "asc")}
          >
            Id
            {!isSorted && <ArrowUpDown className="h-4 w-4" />}
            {isSorted === "asc" && <ArrowUp className="h-4 w-4" />}
            {isSorted === "desc" && <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("id")}</div>
      );
    },
  },
  {
    accessorKey: "name",
    meta: "Name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            {!isSorted && <ArrowUpDown className="h-4 w-4" />}
            {isSorted === "asc" && <ArrowUp className="h-4 w-4" />}
            {isSorted === "desc" && <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("name")}</div>
      );
    },
  },
  {
    accessorKey: "email",
    meta: "Email",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            {!isSorted && <ArrowUpDown className="h-4 w-4" />}
            {isSorted === "asc" && <ArrowUp className="h-4 w-4" />}
            {isSorted === "desc" && <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("email")}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    meta: "Created",
    header: () => <div className="text-right">Created</div>,
    cell: ({ row }) => {
      const createdAt = format(
        Date.parse(row.getValue("createdAt")),
        "dd.MM.yyyy",
      );
      return <div className="text-right font-medium">{createdAt}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userId = row.original.id;
      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  to="/dashboard/users/$userId"
                  params={{ userId: userId }}
                >
                  Edit user
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/dashboard/users/$userId"
                  params={{ userId: userId }}
                >
                  View user
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger
                onSelect={(e) => e.preventDefault()}
                className="w-full"
              >
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() =>
                    navigator.clipboard.writeText(row.original.id.toString())
                  }
                >
                  Delete User
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure to delete user?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault()
                  console.info("User delete button pressed");
                  toast("User has been deleted.");
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
