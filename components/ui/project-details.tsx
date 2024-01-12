import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./button";
import type { ProjectType } from "./project";
import puzzl from "@public/puzzl-022b7bb6.jpeg";

export const ProjectDetails = ({ project }: { project: ProjectType }) => {
  const { name, description, stack, image, url } = project;

  const calcTableRows = () => {
    const frontend = stack.frontend ?? [];
    const backend = stack.backend ?? [];
    const candidate = frontend.length > backend.length ? frontend : backend;

    const rows = candidate.map((_, i) => {
      const frontendCell = frontend[i] ?? "";
      const backendCell = backend[i] ?? "";

      return (
        <TableRow key={`table-row-${project?.name}-${i}`}>
          {frontend.length && <TableCell>{frontendCell}</TableCell>}
          {backend.length && <TableCell>{backendCell}</TableCell>}
        </TableRow>
      );
    });

    return rows;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Details</Button>
      </PopoverTrigger>
      <PopoverContent className="h-fit w-fit">
        <h2 className="text-xl font-bold">Description</h2>
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4 mt-2 mb-4">
          {description}
        </ScrollArea>
        <h2 className="text-xl font-bold mb-2">Stack</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Frontend</TableHead>
              <TableHead>Backend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{calcTableRows()}</TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
};
